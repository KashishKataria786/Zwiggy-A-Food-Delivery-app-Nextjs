import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import { userModel } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


// Restaurant Registration!
export async function POST(request) {
  await mongoose.connect(connectionStr,{useNewUrlParser:true});
  try {
    const payload = await request.json();
    let result;
    let success=false;
    if(payload?.login){
      result = await restaurantSchema.findOne({email:payload.email, password:payload.password});
      if(result){
        success=true
      }
      }else{
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if(result){
        success=true
      }
    }
   
    return NextResponse.json({ result, success });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error creating restaurant',
      error: error.message,
    }, { status: 500 });
  }
}

