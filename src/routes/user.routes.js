const { Router } = require('express');
const userRouter = Router()
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
userRouter.post('/signup',async(req,res)=>{
    const body = req.body
    // console.log(body);
   try{  
    let user = await UserModel.findOne({email : body.email})
    
    if(user){
        return res.status(401).send("User Already Exist")
    }
    let newUser = new UserModel({...body})
    console.log(newUser)
    await newUser.save()
    return res.status(201).send("user signed up")}
    catch(err){
        return res.status(404).send("invalid attempt")
    }
})


userRouter.post('/login' ,async(req,res)=>{
    let body = req.body
    let user = await UserModel.findOne({email : body.email , password : body.password}) 
    if(!user){
        return res.status(401).send("Invalid Credentials")
    }
    const token = jwt.sign({
        name : user.name,
        email : user.email,
        age : user.age,
        role : user.role
    },
    "Secretababa",
    {expiresIn : "5 min"}
    )
    const refreshToken = jwt.sign({
        name : user.name,
        email : user.email,
        age : user.age,
        role : user.role
    },
    "RefreSHTokenX20454",
    {expiresIn : "7 days"}
    )
    res.status(201).send({token,message:"Login Successful",refreshToken})
} )

module.exports = userRouter