import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import redisWrapper from "./redisClient";

import guildRoutes from "./routes/guild";
import applicationRoutes from "./routes/application";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use("/v1/guild", (req, res, next) => {
    req.redisClient = redisWrapper;
    next();
}, guildRoutes);

app.use("/v1/application", (req, res, next) => {
    req.redisClient = redisWrapper;
    next();
}, applicationRoutes);

app.use("/v1/user", (req, res, next) => {
    req.redisClient = redisWrapper;
    next();
}, userRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("root page");
});

app.get("*", (req: Request, res: Response) => {
    res.status(404).send("404 - Not Found");
});

const port = parseInt(process.env.API_PORT || "3000", 10);
app.listen(port, "127.0.0.1", () => {
    console.log(`Server opened at port ${port}`);
});