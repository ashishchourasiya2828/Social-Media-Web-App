const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const config = require("../config/config")

const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes extra spaces
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
        select:false // Minimum password length
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']

      },
      bio: {
        type: String,
        default: "Hello! I'm new here.", // Default bio
        maxlength: 200 // Optional limit for bio length
      },
      profilePicture: {
        type: String, // URL of the profile picture
        // default: "https://res.cloudinary.com/djz3p",
      },
      createdAt: {
        type: Date,
        default: Date.now, // Auto-set the account creation time
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      posts:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "post"
        }
      ],
      followers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
      }],
      following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
      }],
})

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password,10)
}

userSchema.methods.comparePassword = async function name(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = function() {
    return jwt.sign({ _id: this._id }, config.JWT_SECRET)
}

userSchema.statics.verifyToken = function(token) {
    return jwt.verify(token, config.JWT_SECRET)
}

module.exports = mongoose.model('user', userSchema)