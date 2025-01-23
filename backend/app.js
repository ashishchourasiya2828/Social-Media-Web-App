const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require("cookie-parser")

// Middleware
app.use(cors());
app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//db connection
const db = require("./db/db")
db();

//nodemailer connection

//route
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');

// Routes
app.use('/users',userRoute );
app.use('/posts',postRoute );

//

module.exports = app;