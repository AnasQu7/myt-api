const { Router } = require('express');
const collectionRouter = Router()
const carouselModel = require('../../models/carousel.model')



collectionRouter.delete('/:id',async(req,res)=>{
    const {id} = req.params
        try {
            await carouselModel.findByIdAndDelete({_id:id})
            return res.status(201).send("deleted")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})

collectionRouter.patch('/:id',async(req,res)=>{
    const {id} = req.params
    const body = req.body
        try {
            await carouselModel.findByIdAndUpdate(id,{...body})
            return res.status(201).send("updated")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})

collectionRouter.post('/',async(req,res)=>{
    const body = req.body
        try {
           let newCarousel =  new carouselModel({...body})
           await newCarousel.save()
            return res.status(201).send("added")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})


module.exports = collectionRouter