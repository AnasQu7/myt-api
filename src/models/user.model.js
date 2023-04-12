const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email  : String,
    password : String,
    Company : String,
    Location : String,
    cart : Array,
    role : {
        type: String,
        enum : ['user', 'merchant'],
        default: 'user'
    },
})

const UserModel = mongoose.model("users",UserSchema)
 
module.exports = UserModel