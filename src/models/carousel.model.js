const mongoose = require("mongoose")

const CarouselSchema = new mongoose.Schema({
    img : String,
    description : String,
    title : String
})

const CarouselModel = mongoose.model("carousel",CarouselSchema)
 
module.exports = CarouselModel