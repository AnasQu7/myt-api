const { Router } = require('express');
const typeRouter = Router()
const typeModel = require('../models/type.model')

typeRouter.post('/',async(req,res)=>{
    const body = req.body
    
    await typeModel.insertMany({...body})
       
    return res.status(201).send("type added")
})
typeRouter.get('/',async(req,res)=>{
    const body = req.body
    
    let data = await typeModel.find({})
       
    return res.status(201).send(data)
})


module.exports = typeRouter