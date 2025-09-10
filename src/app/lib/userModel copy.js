const { default: mongoose } = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contact:String,
})
export const deliveryAgentModel = mongoose.models.deliveryAgent || mongoose.model('deliveryAgent', deliveryAgentSchema);