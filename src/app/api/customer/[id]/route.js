import { connectionStr } from "@/app/lib/db";
import { FoodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request,content){
    const {id}= await content.params;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let success = false;
    let details = await restaurantSchema.findOne({_id:id});
    const Menu= await FoodSchema.find({restaurant_id:id});
    const FoodImages = Menu?.map((item)=>item.image_path);
    return NextResponse.json({result:details,menu:Menu,foodImages:FoodImages,success:true});
}