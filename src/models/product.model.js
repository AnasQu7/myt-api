const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productcode : String , 
    image : [String] , 
    title : String , 
    description : [String],
    sizes : [String],
    type : String,
    collect : String
},
{ timestamps: true }
)

const ProductModel = mongoose.model("products",ProductSchema)
 
module.exports = ProductModel