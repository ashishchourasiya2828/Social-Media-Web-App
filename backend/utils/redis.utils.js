const Redis = require("ioredis");
const config = require("../config/config");

const redisClient = new Redis({
    port: config.REDIS_PORT,
    host: config.REDIS_HOST,
    password: config.REDIS_PASSWORD
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

const setToken = async (key, value, expiry) => {
    await redisClient.set(key, value, 'EX', expiry);
};

const getToken = async (key) => {
    return await redisClient.get(key);
};

module.exports = {
    setToken,
    getToken
};