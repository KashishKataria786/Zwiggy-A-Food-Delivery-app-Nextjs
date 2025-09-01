import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose, { set } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let success=false;
    let result = await restaurantSchema.find();
    if(result){
        success=true;
    }
    result = result.map((item)=>item.city)
    result = [...new Set(result.map((item)=>item))]
    return NextResponse.json({result,success})
    
}