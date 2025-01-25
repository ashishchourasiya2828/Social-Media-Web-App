const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require("cookie-parser")
const rateLimit = require("express-rate-limit")

// Middleware
app.use(cors());
app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//db connection
const db = require("./db/db")
db();

//express-rate-limit

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Maximum 100 requests per IP in 15 minutes
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  });

app.use(limiter)

//route
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');

// Routes
app.use('/users',userRoute );
app.use('/posts',postRoute );

//

module.exports = app;