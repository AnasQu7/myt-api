const mongoose = require("mongoose")

const CarouselSchema = new mongoose.Schema({
    img : String,
    description : String,
    title : String
},
{ timestamps: true }
)

const CarouselModel = mongoose.model("carousel",CarouselSchema)
 
module.exports = CarouselModel