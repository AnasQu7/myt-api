const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");

module.exports = async function AuthCheck (req,res,next) {
    const token = req.headers["authorization"];
    console.log('yes',token)
    if(!token){
        return  res.status(401).send("Unauthorized")
    }
    try{
        const verification = await jwt.verify(token,"admn9335secret")
        const user = await UserModel.findById(verification._id);
    if(user.role == "admin"){
      return next()
    }}catch{
        return res.status(498).send("session expired")
    }
}
