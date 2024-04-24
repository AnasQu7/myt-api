const { Router } = require('express');
const typeRouter = Router()
const typeModel = require('../models/type.model')

typeRouter.post('/',async(req,res)=>{
    const body = req.body
    
    await typeModel.insertMany({...body})
       
    return res.status(201).send("type added")
})
typeRouter.get('/:id',async(req,res)=>{
    const { id } = req.params;
    
    if(!id){
    return res.status(404).send("Id not found");
    }
    
   try{
     let data = await typeModel.findById(id);
    if (data) {
      return res.status(201).send(data);
    } else {
      return res.status(404).send("not found");
    }
   }catch(err){
       return res.status(404).send("not found");
   }
})
typeRouter.get('/',async(req,res)=>{
    const body = req.body
    
    let data = await typeModel.find({})
       
    return res.status(201).send(data)
})


module.exports = typeRouter
