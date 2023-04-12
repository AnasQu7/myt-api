const userRouter = require('./routes/user.routes')
const carouselRouter = require('./routes/carousel.routes')
const typeRouter = require('./routes/type.routes')
const productRouter = require('./routes/product.routes')
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/user',userRouter)
app.use('/carousel',carouselRouter)
app.use('/types',typeRouter)
app.use('/products',productRouter)

mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://mytradersrugs:H4kjDrNlF6DLAXAg@cluster0.yjq2spj.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    app.listen(8000 , ()=>{
        console.log("running on http://localhost:8000")
    })
}).catch((e)=>{
    console.log(e.message)
})
