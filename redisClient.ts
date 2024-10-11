import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

class RedisWrapper {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined
            },
            password: process.env.REDIS_PASSWORD ?? ""
        });

        this.client.connect();

        this.client.on("error", (err: Error) => {
            console.error("Redis error:", err);
        });
    }

    async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key);
        } catch (err) {
            console.error("Redis get error:", err);
            return null;
        }
    }

    async set(key: string, value: string): Promise<void> {
        try {
            await this.client.set(key, value);
        } catch (err) {
            console.error("Redis set error:", err);
        }
    }

    async setEx(key: string, seconds: number, value: string): Promise<void> {
        try {
            await this.client.setEx(key, seconds, value);
        } catch (err) {
            console.error("Redis setEx error:", err);
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (err) {
            console.error("Redis del error:", err);
        }
    }
}

const redisWrapper = new RedisWrapper();
export default redisWrapper;