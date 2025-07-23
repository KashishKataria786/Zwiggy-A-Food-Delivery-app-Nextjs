import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const data=await restaurantSchema.find();
    console.log(data);
    return NextResponse.json({result:data})
}

export async function POST(request) {
  try {await mongoose.connect(connectionStr);
    
    const payload = await request.json();

    
    const restaurant = new restaurantSchema(payload);
    const result = await restaurant.save();

    return NextResponse.json({ result, success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error creating restaurant',
      error: error.message,
    }, { status: 500 });
  }
}