const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const cors = require("cors");
const redis = require('redis');

const snowflakeToDate = require("./utils");
const { USER_FLAGS, APPLICATION_FLAGS } = require("./Constants");

require('dotenv').config();

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PASSWORD ?? ""
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

app.get("/v1/guild/:id", cors({
    methods: ["GET"]
}), async (req, res) => {
    let id = req.params.id;

    let cached = await client.get(`guild_${id}`);

    if (cached) res.send(JSON.parse(cached));
    else {
        fetch(`https://canary.discord.com/api/v10/guilds/${id}/widget.json`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code && json.code === 50004) {
                    res.send({
                        "error": "The guild is either non-existant, unavailable, or has Server Widget/Discovery disabled."
                    })
                    return;
                }

                let output = {
                    id: json.id,
                    name: json.name,
                    instant_invite: json.instant_invite,
                    presence_count: json.presence_count
                }

                res.send(output);
                client.setEx(`guild_${id}`, 10800, JSON.stringify(output))
        })
    }
})

app.get("/v1/application/:id", cors({
    methods: ["GET"]
}), async (req, res) => {
    let id = req.params.id;
    
    let cached = await client.get(`application_${id}`)

    if (cached) res.send(JSON.parse(cached));
    else {
        fetch(`https://canary.discord.com/api/v10/applications/${req.params.id}/rpc`, {
            headers: {
                "Content-Type": "application/json",
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
                    Authorization: `Bot ${process.env.TOKEN}`,
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.message) return res.send(json);
                    
                    let publicFlags = [];

                    let premiumTypes = {
                        0: "None",
                        1: "Nitro Classic",
                        2: "Nitro",
                        3: "Nitro Basic"
                    }

                    USER_FLAGS.forEach((flag) => {
                        if (json.public_flags & flag.bitwise) publicFlags.push(flag.flag);
                    });

                    let avatarLink = null;
                    if (json.avatar)
                        avatarLink = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`;

                    let bannerLink = null;
                    if (json.banner)
                        bannerLink = `https://cdn.discordapp.com/banners/${json.id}/${json.banner}?size=480`;

                    let output = {
                        id: json.id,
                        created_at: snowflakeToDate(json.id),
                        username: json.username,
                        avatar: {
                            id: json.avatar,
                            link: avatarLink,
                            is_animated: json.avatar != null && json.avatar.startsWith("a_") ? true : false,
                        },
                        avatar_decoration: json.avatar_decoration_data,
                        badges: publicFlags,
                        premium_type: premiumTypes[json.premium_type],
                        accent_color: json.accent_color,
                        global_name: json.global_name,
                        banner: {
                            id: json.banner,
                            link: bannerLink,
                            is_animated: json.banner != null && json.banner.startsWith("a_") ? true : false,
                            color: json.banner_color,
                        },
                        raw: json
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

app.listen(process.env.API_PORT, "127.0.0.1");
console.log(`Server opened at port ${process.env.API_PORT}`);