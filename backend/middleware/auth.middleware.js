const userModel = require("../models/user.model")
const redis = require("ioredis");
const { getToken } = require("../utils/redis.utils");



module.exports.authUser = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split("")[1]
    if(!token){
     return res.status(401).json({message:"unauthorized"});
    }
    try{

        const blacklistToken = await getToken(`BlacklistToken_${token}`);

        if(blacklistToken){
                return res.status(401).json({message:"redis unauthorized"});
        }

        const decoded = userModel.verifyToken(token)
        const user = await userModel.findById(decoded._id)
        
        req.user = user
        return next()


    }catch(err){
        console.error(err);
        res.status(401).json({message:err.message});
    }
}