const dotenv = require('dotenv')
dotenv.config()

const _config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    REFRESH_TOKEN:process.env.REFRESH_TOKEN,
}

const config = Object.freeze(_config)

module.exports = config