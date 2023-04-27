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


module.exports = carouselRouter