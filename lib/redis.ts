import Redis, { RedisOptions } from 'ioredis';

const port = Number(process.env.REDIS_PORT || 6379);
const host = process.env.REDIS_HOST || 'localhost';
const redis = new Redis(port, host, {});

export default redis;