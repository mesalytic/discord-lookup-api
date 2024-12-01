import express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";

import utils from "../utils";

const router = express.Router();

router.get("/:id", cors({ methods: ["GET"] }), async (req: Request, res: Response) => {
    const id = utils.checkValidSnowflake(req.params.id);
    const redisClient = req.redisClient;
    const disableCache = req.disableCache;

    if (id === "Invalid Discord ID") {
        res.send({ message: "Value is not a valid Discord snowflake" });
        return;
      }

    if (!disableCache && redisClient) {
        const cached = await redisClient.get(`guild_${id}`);
        if (cached) {
            res.send(JSON.parse(cached));
            return;
        }
    }

    try {
        const response = await fetch(`https://canary.discord.com/api/v10/guilds/${id}/widget.json`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        if (json.code && json.code === 50004) {
            res.send({
                error: "The guild is either non-existent, unavailable, or has Server Widget/Discovery disabled."
            });
            return;
        }

        const output = {
            id: json.id,
            name: json.name,
            instant_invite: json.instant_invite,
            presence_count: json.presence_count
        };

        res.send(output);
        if (!disableCache && redisClient) {
            await redisClient.setEx(`guild_${id}`, 10800, JSON.stringify(output));
        }
    } catch (error) {
        res.status(500).send({ error: "An error occurred while fetching the guild data." });
    }
});

export default router;