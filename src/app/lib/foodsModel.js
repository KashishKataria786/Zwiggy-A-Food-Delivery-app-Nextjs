const { default: mongoose } = require("mongoose");

const foodsModel= new mongoose.Schema({
    name:String,
    price:Number,
    image_path:String,
    description:String,
    veg:{type:Boolean,default:true},
    restaurant_id:{type: mongoose.Schema.Types.ObjectId, ref: "restaurants", required: true },
    rating:{type:Number , default:0},
    
})

export const FoodSchema =mongoose.models.foods || mongoose.model('foods', foodsModel)