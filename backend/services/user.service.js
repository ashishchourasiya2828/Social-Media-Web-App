const userModel = require("../models/user.model");
const { setToken, getToken } = require("../utils/redis.utils");
const sendEmail = require("../services/email");

module.exports.registerUser = async function ({ email, password, username }) {
  // Validate input
  if (!email || !password || !username) {
    throw new Error("All fields are required");
  }

  const user = userModel.create({
    email,
    password,
    username,
  });
  return user;
};

module.exports.resetPasswordEmail = async function ({ user }) {
  if (!user) {
    throw new Error("User not found");
  }

  const email = user.email;

  const token = user.generateToken(); // Generate a token
  await setToken(`reset_${token}`, token, 600); // Store token in Redis with 10 min expiration

  const resetLink = `http://localhost:5173/reset-password/${token}`;
  const message = `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 10 minutes.</p>`;

  await sendEmail(email, "Password Reset", message);

  return true;
};

module.exports.resetPassword = async function ({ token, password,res }) {
  if (!token || !password) {
    throw new Error("Token and password are required");
  }

  const storedToken = await getToken(`reset_${token}`);
  if (!storedToken) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const decoded = userModel.verifyToken(token);

  const user = await userModel.findById(decoded._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return user;
};

module.exports.followUser = async function ({ followUserId, userId }) {
   
    if (!followUserId || !userId) {
        throw new Error("User and followUserId are required");
    }

    const user = await userModel.findById(userId);
    const followUser = await userModel.findById(followUserId);
    
    if (!user || !followUser) {
        throw new Error("User or followUser not found");
    }

    const isFollowing = user.following.includes(followUserId);

    if(isFollowing){
        user.following.pull(followUserId);
        followUser.followers.pull(userId);
    }
    else{
        user.following.push(followUserId);
        followUser.followers.push(userId);
    }

    await user.save();
    await followUser.save();

    return isFollowing ? "unfollowed Succesfully" : "followed Succesfully" ;

}

module.exports.profilePicture = async function ({ req,id }) {
    
    if(!id){
        throw new Error("User id is required");
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = req.file.path; // Cloudinary URL of the uploaded image

    if (!imageUrl) {
      return res.status(500).json({ error: 'Failed to get image URL' });
    }

   const user =  await userModel.findByIdAndUpdate(id, 
    { profilePicture: imageUrl },
    { new: true, runValidators: true });
  
  

   return user;
}