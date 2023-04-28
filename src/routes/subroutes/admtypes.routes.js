const { Router } = require('express');
const TypeModel = require('../../models/type.model');
const admTypesRouter = Router()



admTypesRouter.delete('/:id',async(req,res)=>{
    const {id} = req.params
        try {
            await TypeModel.findByIdAndDelete({_id:id})
            return res.status(201).send("deleted")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})

admTypesRouter.patch('/:id',async(req,res)=>{
    const {id} = req.params
    const body = req.body
    // console.log(id,body)
        try {
            await TypeModel.findByIdAndUpdate(id,{...body})
            return res.status(201).send("updated")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})

admTypesRouter.post('/',async(req,res)=>{
    const body = req.body
        try {
           let newCarousel =  new TypeModel({...body})
           await newCarousel.save()
            return res.status(201).send("added")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})


module.exports = admTypesRouter