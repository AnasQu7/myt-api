const { Router } = require('express');
const productRouter = Router()
const productModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')


function checkliked(likedProd,x){
    
    let flag = false ;

      for(let i = 0 ; i < likedProd.length ; i++){
        if(likedProd[i]['_id']==x){
          flag = true;
          break ;
        }
      }
    
    return flag
}


productRouter.post('/',async(req,res)=>{
    const body = req.body
    
    await productModel.insertMany({...body})
       
    return res.status(201).send("product added")
})
productRouter.get('/',async(req,res)=>{
    const body = req.body
   try{ 
       const query = req.query
       console.log(query)
    if(query.search){
        
        if(query.limit){
        
            let s = query.search.toString()
            let data = await productModel.find({
                $or: [
                    {"type" : {'$regex' : s , $options : 'i'}},
                    {"title" : {'$regex' : s , $options : 'i'}},
                    {"description" : {'$regex' : s , $options : 'i'}},
                    {"sizes" : {'$regex' : s , $options : 'i'}},
                    {"productcode" : {'$regex' : s , $options : 'i'}},
                  ]
            }, null, {sort:{"updatedAt":-1}}).limit(query.limit)
            return res.status(201).send(data)


        }else{

             let s = query.search.toString()
            
            let data = await productModel.find({
                $or: [
                {"title" : {'$regex' : s , $options : 'i'}},
                {"productcode" : {'$regex' : s , $options : 'i'}},
                {"description" : {'$regex' : s , $options : 'i'}},
                {"sizes" : {'$regex' : s , $options : 'i'}},
                {"type" : {'$regex' : s , $options : 'i'}},
                {"collect" : {'$regex' : s , $options : 'i'}},
              ]
            }, null, {sort:{"updatedAt":-1}})
            return res.status(201).send(data)

        }
    }
    else if(query.type){
        let data = await productModel.find({type : query.type}, null, {sort:{"updatedAt":-1}})
        return res.status(201).send(data)
    }
    else if(query.collection){
       
        let data = await productModel.find({collect : query.collection}, null, {sort:{"updatedAt":-1}})
        return res.status(201).send(data)
    }
    else{

        let data = await productModel.find({}, null, {sort:{"updatedAt":-1}})
        return res.status(201).send(data)
    }
}catch(e){
    
    return res.status(500).send(e.message)
}

})
productRouter.get('/:id',async(req,res)=>{
    const {id} = req.params
    const token = req.headers["authorization"]
    if(token){
        try {
            
        const user = await jwt.verify(token,"Secretababa");
        let userFound = await UserModel.findById(user._id);
        let data = await productModel.findById(id)
        return res.status(201).send({...data.toObject(),liked : checkliked(userFound.cart,data._id)})
        
        } catch (error) {
            let data = await productModel.findById(id)
       
            return res.status(201).send(data)
        }
    }
    let data = await productModel.findById(id)
       
    return res.status(201).send(data)
})
productRouter.post('/addtoliked',async(req,res)=>{
    const token = req.headers["authorization"]
    const body = req.body
    console.log(token)
    if(!token){
        return  res.status(401).send("Unauthorized")
    }
    try{
        const user = await jwt.verify(token,"Secretababa");

        let userFound = await UserModel.findById(user._id);
        let updatedCart = [...userFound.cart,{...body}]
        await UserModel.findByIdAndUpdate(user._id,{cart : updatedCart})
       
       return res.status(201).send("liked")
    }catch{
        return res.status(498).send("session expired")
    }
})


productRouter.post('/viewliked',async(req,res)=>{
    const token = req.headers["authorization"]
 
    // console.log("token",token)
    if(!token){
        return  res.status(401).send("Unauthorized")
    }
    try{
        const user = await jwt.verify(token,"Secretababa");
        let userFound = await UserModel.findById(user._id);
       
       return res.status(201).send(userFound.cart)
    }catch{
        return res.status(498).send("session expired")
    }
})

productRouter.post('/removeliked',async(req,res)=>{
    const token = req.headers["authorization"]
    const {id} = req.body
    if(!token){
        return  res.status(401).send("Unauthorized")
    }
    try{
        const user = await jwt.verify(token,"Secretababa");
        
        let userFound = await UserModel.findById(user._id);
        let updatedCart = userFound.cart.filter((e)=>e._id!=id)
        console.log(updatedCart)
        await UserModel.findByIdAndUpdate(user._id,{cart : updatedCart})
       
       return res.status(201).send("unliked")
    }catch{
        return res.status(498).send("session expired")
    }
})





module.exports = productRouter