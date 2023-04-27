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
   try{ 
    const token = jwt.sign({
        _id : user._id,
        email : user.email,
       Company : user.Company,
       Location : user.Location,
       role : user.role
    },
    "Secretababa",
    {expiresIn : "7 days"}
    )

    res.status(201).send({token,message:"Login Successful"})
}
catch(e){
    return res.status(401).send(e.message)
}
} )

userRouter.get('/autologin',async(req,res)=>{
    const token = req.headers["authorization"]
    if(!token){
        return  res.status(401).send("Unauthorized")
    }
    try{
        const verification = await jwt.verify(token,"Secretababa")
        const user = await UserModel.findById(verification._id);
    if(user.email){
       return res.status(201).send("logged in")
    }}catch{
        return res.status(498).send("session expired")
    }
})

userRouter.get('/userDetails',async(req,res)=>{
    const token = req.headers["authorization"]
    console.log(token)
    if(!token){
        return  res.status(401).send("Unauthorized")
    }
    try{
        const verification = await jwt.verify(token,"Secretababa")
        if(verification){
        const {role,Company,Location,email,cart} = await UserModel.findById(verification._id)
       return res.status(201).send({role,Company,Location,email,cart})
    }}catch{
        return res.status(498).send("session expired")
    }
})


// admin login
userRouter.post('/admin/login' ,async(req,res)=>{
    let body = req.body
    let user = await UserModel.findOne({email : body.email , password : body.password}) 
    if(!user){
        return res.status(401).send("Invalid Credentials")
    }
   try{ 
    const token = jwt.sign({
        _id : user._id,
        email : user.email,
       Company : user.Company,
       Location : user.Location,
       role : user.role
    },
    "admn9335secret",
    {expiresIn : "1 days"}
    )

    res.status(201).send({token,message:"Login Successful"})
}
catch(e){
    return res.status(401).send(e.message)
}
} )

module.exports = userRouter