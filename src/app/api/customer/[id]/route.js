import connectDatabase, { connectionStr } from "@/app/lib/db";
import { FoodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    await connectDatabase();
    const {id} = await content.params; 
    if(!id){
        return NextResponse.json({success:false,message:"Id not found"}, {status:400});
    }
    try {
        let details = await restaurantSchema.findOne({_id:id});
        const Menu = await FoodSchema.find({restaurant_id:id});
        if(!details || !Menu){
            return NextResponse.json({success:false,message:"Error in Getting Details"});
        }
        const FoodImages = Menu?.map((item)=>item.image_path);

        return NextResponse.json({succes:true,result:details, menu:Menu,foodImages:FoodImages}, {status:200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false, message:"Something Went Wrong"}, {
            status:500
        })
    }
}