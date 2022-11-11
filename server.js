const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const cors = require("cors");

const config = require("./config.json");

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

app.get("/v1/:id/", cors({ methods: ["GET"] }), (req, res) => {
  let id = req.params.id;

  fetch(`https://canary.discord.com/api/v10/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${config.token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      let publicFlags = [];

      let FLAGS = [
        { flag: "DISCORD_EMPLOYEE", bitwise: 1 << 0 },
        { flag: "PARTNERED_SERVER_OWNER", bitwise: 1 << 1 },
        { flag: "HYPESQUAD_EVENTS", bitwise: 1 << 2 },
        { flag: "BUGHUNTER_LEVEL_1", bitwise: 1 << 3 },
        { flag: "HOUSE_BRAVERY", bitwise: 1 << 6 },
        { flag: "HOUSE_BRILLIANCE", bitwise: 1 << 7 },
        { flag: "HOUSE_BALANCE", bitwise: 1 << 8 },
        { flag: "EARLY_SUPPORTER", bitwise: 1 << 9 },
        { flag: "TEAM_USER", bitwise: 1 << 10 },
        { flag: "BUGHUNTER_LEVEL_2", bitwise: 1 << 14 },
        { flag: "VERIFIED_BOT", bitwise: 1 << 16 },
        { flag: "EARLY_VERIFIED_BOT_DEVELOPER", bitwise: 1 << 17 },
        { flag: "DISCORD_CERTIFIED_MODERATOR", bitwise: 1 << 18 },
        { flag: "BOT_HTTP_INTERACTIONS", bitwise: 1 << 19 },
      ];

      FLAGS.forEach((flag) => {
        if (json.public_flags & flag.bitwise) publicFlags.push(flag.flag);
      });

      let avatarLink = null;
      if (json.avatar)
        avatarLink = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`;

      let bannerLink = null;
      if (json.banner)
        bannerLink = `https://cdn.discordapp.com/banners/${json.id}/${json.banner}`;

      res.send({
        id: json.id,
        tag: `${json.username}#${json.discriminator}`,
        badges: publicFlags,
        avatar: {
          id: json.avatar,
          link: avatarLink,
          is_animated:
            json.avatar != null && json.avatar.startsWith("a_") ? true : false,
        },
        banner: {
          id: json.banner,
          link: bannerLink,
          is_animated:
            json.banner != null && json.banner.startsWith("a_") ? true : false,
          color: json.banner_color,
        },
      });
      console.log(json);
    });
});

app.get("*", function (req, res) {
  //console.log(req);
  res.status(404).send("404 - Not Found");
});

app.listen(process.env.port || 3000, "127.0.0.1");
console.log(`Server opened at port ${process.env.port || 3000}`);
