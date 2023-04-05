const mongoose = require("mongoose")

const TypeSchema = new mongoose.Schema({
    img : String,
    description : String,
    title : String
})

const TypeModel = mongoose.model("Types",TypeSchema)
 
module.exports = TypeModel