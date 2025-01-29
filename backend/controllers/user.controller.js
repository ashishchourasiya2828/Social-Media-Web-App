const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { setToken, getToken } = require("../utils/redis.utils");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{username},{email}]
    })


  if (existingUser) {
    return res.status(400).json({ errors: [{ msg: "Email or username already exists" }] });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const newUser = await userService.registerUser({
    email,
    username,
    password: hashedPassword,
  });

  // const token = newUser.generateToken();

  res.status(201).json({ user: newUser});
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const token = user.generateToken();

  res.cookie("token", token,{
    httpOnly:true,
    secure:true,
    sameSite:"Strict"
  });

     return res.status(200).json({user,token})
  // res.redirect(`/users/${user._id}/profile`);
};

module.exports.userProfile = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    

    const user = await userModel.findById(id)
      .populate('posts')
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split("")[1];
  await setToken(`blacklistToken_${token}`, token, 86400); // Set token with 1 day expiration
  res.clearCookie("token");
  return res.status(200).json({ message: "logged out successfully" });
};

module.exports.sendResetPasswordMail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await userService.resetPasswordEmail({ user });

  return res.status(200).json({ message: "Password reset email sent" });
};

module.exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token } = req.params;
  const { password } = req.body;

  const user = await userService.resetPassword({ token, password,res });

  if(!user){
    return res.status(404).json({error:"user not found "})
  }

  user.password = await userModel.hashPassword(password);

  await user.save();

  return res.status(200).json({ message: "Password reset successfully" });
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, bio, profilePicture, email } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { username, email, bio }, // Fields to update
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Send back the updated user data
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.followUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const followUserId = req.params.id;
    const userId = req.user._id;

    if(followUserId === userId.toString()){
        return res.status(400).json({message:"You cannot follow yourself"})
    }

    
    try {
    const message = await userService.followUser({ followUserId, userId });
    return res.status(200).json({ message });

    }catch(err){
        return res.status(500).json({message:"Internal Server error"})
    }





}

module.exports.updateProfilePicture = async (req, res) => {
  try {

    const { id } = req.params;

    if(id !== req.user._id.toString()){
        return res.status(401).json({message:"Unauthorized"})
    }

   const user = await userService.profilePicture({req,id})

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'Image uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}