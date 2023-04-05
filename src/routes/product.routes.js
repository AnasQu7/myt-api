const { Router } = require('express');
const productRouter = Router()
const productModel = require('../models/product.model')

productRouter.post('/',async(req,res)=>{
    const body = req.body
    
    await productModel.insertMany({...body})
       
    return res.status(201).send("product added")
})
productRouter.get('/',async(req,res)=>{
    const body = req.body
    
    let data = await productModel.find({}, null, {sort:{"updatedAt":-1}})
       
    return res.status(201).send(data)
})
productRouter.get('/:id',async(req,res)=>{
    const {id} = req.params
    
    let data = await productModel.findById(id)
       
    return res.status(201).send(data)
})


module.exports = productRouter