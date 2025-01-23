const Redis = require("ioredis");

const redisClient = new Redis({
    port: 18906,
    host: "redis-18906.c330.asia-south1-1.gce.redns.redis-cloud.com",
    password: "T5ziCNNNtnFKag78MzdFyhcwOYoLJkHj"
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