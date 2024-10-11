import express, { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import client from "../redisClient";

const router = express.Router();

router.get("/:id", cors({ methods: ["GET"] }), async (req: Request, res: Response) => {
    const id = req.params.id;

    const cached = await client.get(`guild_${id}`);

    if (cached) {
        res.send(JSON.parse(cached));
    } else {
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
            await client.setEx(`guild_${id}`, 10800, JSON.stringify(output));
        } catch (error) {
            res.status(500).send({ error: "An error occurred while fetching the guild data." });
        }
    }
});

export default router;