import express, { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import { APPLICATION_FLAGS } from "../constants";

const router = express.Router();

router.get("/:id", cors({ methods: ["GET"] }), async (req: Request, res: Response) => {
    const id = req.params.id;
    const redisClient = req.redisClient;
    const disableCache = req.disableCache;

    if (!disableCache && redisClient) {
        const cached = await redisClient.get(`application_${id}`);
        if (cached) {
            res.send(JSON.parse(cached));
            return;
        }
    }

    try {
        const response = await fetch(`https://canary.discord.com/api/v10/applications/${id}/rpc`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        const hashIcon = json.icon;
        json.icon = `https://cdn.discordapp.com/avatars/${json.id}/${hashIcon}`;

        const publicFlags: string[] = [];
        const flags = json.flags;
        APPLICATION_FLAGS.forEach((flag) => {
            if (json.flags & flag.bitwise) publicFlags.push(flag.flag);
        });
        json.flags = {
            bits: flags,
            detailed: publicFlags
        };

        res.send(json);
        if (!disableCache && redisClient) {
            await redisClient.setEx(`application_${id}`, 10800, JSON.stringify(json));
        }
    } catch (error) {
        res.status(500).send({ error: "An error occurred while fetching the application data." });
    }
});

export default router;