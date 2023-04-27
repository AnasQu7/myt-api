const { Router } = require('express');
const admproductRouter = Router()
const productModel = require('../../models/product.model')
// const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')



admproductRouter.post('/',async(req,res)=>{
    const body = req.body
        try {
           let newProduct =  new productModel({...body})
           await newProduct.save()
            return res.status(201).send("added")
        } catch (error) {
            
            return res.status(404).send(data)
        }
})

admproductRouter.patch('/:id',async(req,res)=>{
    const {id} = req.params
    const body = req.body
        try {
            await productModel.findByIdAndUpdate(id,{...body})
            return res.status(201).send("updated")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})
admproductRouter.delete('/:id',async(req,res)=>{
    const {id} = req.params
        try {
            await productModel.findByIdAndDelete({_id:id})
            return res.status(201).send("deleted")
        } catch (error) {
            
            return res.status(404).send(data)
        }
   
})







module.exports = admproductRouter