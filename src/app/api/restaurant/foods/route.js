import { connectionStr } from "@/app/lib/db";
import { FoodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json(); 
    console.log('Received payload:', payload);

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    const food = new FoodSchema(payload);
    const result = await food.save();

    console.log('Result:', result);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error creating food item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create food item', error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request,content){
    const id= content.params.id;
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const result=  await FoodSchema.deleteOne({_id:id});
    if(result.deletedCount>0){
        success=true;
    } 
    return NextResponse.json({result,success:true})
}

