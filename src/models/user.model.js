const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email  : String,
    password : String,
    Company : String,
    Location : String,
    role : {
        type: String,
        enum : ['user', 'merchant'],
        default: 'user'
    },
    cart : [Object]
})

const UserModel = mongoose.model("users",UserSchema)
 
module.exports = UserModel