const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const cors = require("cors");
const redis = require('redis');

const config = require("./config.json");
const snowflakeToDate = require("./utils");
const { USER_FLAGS, APPLICATION_FLAGS } = require("./Constants");

const client = redis.createClient({
    socket: {
        host: config.redis.host,
        port: config.redis.port
    },
    password: config.redis.password
})

client.connect();

client.on("error", (err) => {
    console.log(err);
})

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/", (req, res) => {
    res.send("root page");
});

app.get("/v1/application/:id", cors({
    methods: ["GET"]
}), async (req, res) => {
    res.send({
        error: 403,
        message: "This endpoint is currently disabled."
    })
    /*
    let id = req.params.id;
    
    let cached = await client.get(`application_${id}`)

    if (cached) res.send(JSON.parse(cached));
    else {
        fetch(`https://canary.discord.com/api/v10/applications/${req.params.id}/public`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${config.workerToken}`,
            },
        })
            .then((res) => res.json())
            .then((json) => {
                let hashIcon = json.icon;
                json.icon = `https://cdn.discordapp.com/avatars/${json.id}/${hashIcon}`

                let publicFlags = [];
                let flags = json.flags;
                APPLICATION_FLAGS.forEach((flag) => {
                    if (json.flags & flag.bitwise) publicFlags.push(flag.flag);
                });
                json.flags = {
                    bits: flags,
                    detailed: publicFlags
                }

                res.send(json);
                client.setEx(`application_${id}`, 10800, JSON.stringify(json))
            })
    }
*/
})

app.get("/v1/user/:id/", cors({
    methods: ["GET"]
}), async (req, res) => {
    let id = req.params.id;

    try {
        let cached = await client.get(`user_${id}`)

        if (cached) res.send(JSON.parse(cached));
        else {
            fetch(`https://canary.discord.com/api/v10/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bot ${config.token}`,
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    let publicFlags = [];

                    USER_FLAGS.forEach((flag) => {
                        if (json.public_flags & flag.bitwise) publicFlags.push(flag.flag);
                    });

                    let avatarLink = null;
                    if (json.avatar)
                        avatarLink = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`;

                    let bannerLink = null;
                    if (json.banner)
                        bannerLink = `https://cdn.discordapp.com/banners/${json.id}/${json.banner}`;

                    let output = {
                        id: json.id,
                        created_at: snowflakeToDate(json.id),
                        tag: `${json.username}#${json.discriminator}`,
                        badges: publicFlags,
                        avatar: {
                            id: json.avatar,
                            link: avatarLink,
                            is_animated: json.avatar != null && json.avatar.startsWith("a_") ? true : false,
                        },
                        banner: {
                            id: json.banner,
                            link: bannerLink,
                            is_animated: json.banner != null && json.banner.startsWith("a_") ? true : false,
                            color: json.banner_color,
                        }
                    }

                    res.send(output);
                    client.setEx(`user_${id}`, 10800, JSON.stringify(output)) // cached for 3 hours
                });
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("*", function (req, res) {
    res.status(404).send("404 - Not Found");
});

app.listen(process.env.port || config.port, "127.0.0.1");
console.log(`Server opened at port ${process.env.port || config.port}`);