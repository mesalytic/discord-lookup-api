import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import minimist from "minimist";
import redisWrapper from "./redisClient";

import guildRoutes from "./routes/guild";
import applicationRoutes from "./routes/application";
import userRoutes from "./routes/user";

dotenv.config();

const args = minimist(process.argv.slice(2));
const disableCache = args["disable-cache"];

const app = express();
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use((req, res, next) => {
    req.disableCache = disableCache;
    req.redisClient = redisWrapper;
    next();
});

app.use("/v1/guild", guildRoutes);
app.use("/v1/application", applicationRoutes);
app.use("/v1/user", userRoutes);

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