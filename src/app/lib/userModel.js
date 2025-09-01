const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contact:String,
})
export const userModel = mongoose.models.users || mongoose.model('users', userSchema);