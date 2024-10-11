import { RedisWrapper } from "../../redisClient";

declare global {
    namespace Express {
        interface Request {
            redisClient: RedisWrapper;
        }
    }
}