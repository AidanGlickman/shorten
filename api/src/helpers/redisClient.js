import Redis from 'ioredis';

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB,
});

export default redis;
