import Redis from 'ioredis';

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: process.env.REDIS_DB,
});

export default redis;
