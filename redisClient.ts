import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined
    },
    password: process.env.REDIS_PASSWORD ?? ""
});

client.connect();

client.on("error", (err: Error) => {
    console.log(err);
});

export default client;