const { Router } = require('express');
const carouselRouter = Router()
const carouselModel = require('../models/carousel.model')


carouselRouter.get('/',async(req,res)=>{
   
 try{
    let data = await carouselModel.find({}, null, {sort:{"updatedAt":-1}})
       
    return res.status(201).send(data)
}
catch(e){
    
    return res.status(404).send(e.message)
 }
})

carouselRouter.get('/:id',async(req,res)=>{
   const { id } = req.params;
    
    if(!id){
    return res.status(404).send("Id not found");
    }
 try{
    let data = await carouselModel.findById(id);
    if (data) {
      return res.status(201).send(data);
    } else {
      return res.status(404).send("not found");
    }
}
catch(e){
    
    return res.status(404).send(e.message)
 }
})


module.exports = carouselRouter
