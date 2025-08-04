const { default: mongoose } = require("mongoose");

const foodsModel= new mongoose.Schema({
    name:String,
    price:Number,
    image_path:String,
    description:String,
    restaurant_id:mongoose.Schema.Types.ObjectId
})

export const FoodSchema =mongoose.models.foods || mongoose.model('foods', foodsModel)