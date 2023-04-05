const { Router } = require('express');
const carouselRouter = Router()
const carouselModel = require('../models/carousel.model')

carouselRouter.post('/',async(req,res)=>{
    const body = req.body
    
    await carouselModel.insertMany({...body})
       
    return res.status(201).send("carousel added")
})
carouselRouter.get('/',async(req,res)=>{
    const body = req.body
    
    let data = await carouselModel.find({})
       
    return res.status(201).send(data)
})


module.exports = carouselRouter