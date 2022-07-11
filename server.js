const express = require('express');
const http = require('http');
const fetch = require('node-fetch');
const cors = require('cors');

const config = require('./config.json');

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.send("root page");
})

app.get('/:id/', cors({ methods: ['GET'] }), (req, res) => {
    let id = req.params.id
    
    fetch(`https://canary.discord.com/api/v9/users/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bot ${config.token}`
        }
    }).then(res => res.json())
    .then(json => {

        let avatarLink = null;
        if (json.avatar) avatarLink = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`

        let bannerLink = null;
        if (json.banner) bannerLink = `https://cdn.discordapp.com/banners/${json.id}/${json.banner}`

        res.send({
            id: json.id,
            tag: `${json.username}#${json.discriminator}`,
            avatar: {
                id: json.avatar,
                link: avatarLink,
                is_animated: json.avatar != null && json.avatar.startsWith("a_") ? true : false
            },
            banner: {
                id: json.banner,
                link: bannerLink,
                is_animated: json.banner != null && json.banner.startsWith("a_") ? true : false,
                color: json.banner_color
            }
        });
        console.log(json);
    })
})

app.get('*', function(req, res){
    //console.log(req);
    res.status(404).send('404 - Not Found');
});

app.listen(process.env.port || 3000);
console.log(`Server opened at port ${process.env.port || 3000}`);