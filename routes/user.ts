import express, { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import { USER_FLAGS } from "../constants";
import snowflakeToDate from "../utils";

const router = express.Router();

router.get("/:id", cors({ methods: ["GET"] }), async (req: Request, res: Response) => {
    const id = req.params.id;
    const redisClient = req.redisClient;

    try {
        const cached = await redisClient.get(`user_${id}`);

        if (cached) {
            res.send(JSON.parse(cached));
        } else {
            const response = await fetch(`https://canary.discord.com/api/v10/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bot ${process.env.TOKEN}`,
                },
            });
            const json = await response.json();

            if (json.message) {
                res.send(json);
                return;
            }

            const publicFlags: string[] = [];

            const premiumTypes: { [key: number]: string } = {
                0: "None",
                1: "Nitro Classic",
                2: "Nitro",
                3: "Nitro Basic"
            };

            USER_FLAGS.forEach((flag) => {
                if (json.public_flags & flag.bitwise) publicFlags.push(flag.flag);
            });

            let avatarLink: string | null = null;
            if (json.avatar)
                avatarLink = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`;

            let bannerLink: string | null = null;
            if (json.banner)
                bannerLink = `https://cdn.discordapp.com/banners/${json.id}/${json.banner}?size=480`;

            const output = {
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
            };

            res.send(output);
            await redisClient.setEx(`user_${id}`, 10800, JSON.stringify(output)); // cached for 3 hours
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "An error occurred while fetching the user data." });
    }
});

export default router;