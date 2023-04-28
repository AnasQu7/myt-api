const { Router } = require('express');
const admuserRouter = Router()
const UserModel = require('../../models/user.model')
const jwt = require('jsonwebtoken')


admuserRouter.get('/autologin',async(req,res)=>{
        return res.status(201).send("logged in")
})

admuserRouter.get('/userDetails',async(req,res)=>{
    const token = req.headers["authorization"]
    console.log(token)
    if(!token){
        return  res.status(401).send("Unauthorized")
    }
    try{
        const verification = await jwt.verify(token,"admn9335secret")
        if(verification){
        const {role,Company,Location,email,cart} = await UserModel.findById(verification._id)
       return res.status(201).send({role,Company,Location,email,cart})
    }}catch{
        return res.status(498).send("session expired")
    }
})
admuserRouter.get('/allusers',async(req,res)=>{
    
    try{
        const allUsers = await UserModel.find({})
       return res.status(201).send(allUsers)
    }catch{
        return res.status(500).send("session expired")
    }
})
admuserRouter.delete('/:id',async(req,res)=>{
    const {id} = req.params
        try {
            await UserModel.findByIdAndDelete({_id:id})
            return res.status(201).send("deleted")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})

module.exports = admuserRouter