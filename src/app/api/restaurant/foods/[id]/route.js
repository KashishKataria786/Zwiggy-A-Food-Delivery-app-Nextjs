import { connectionStr } from "@/app/lib/db";
import { FoodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request, content) {
  const id = content.params.id;

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Missing restaurant ID' },
      { status: 400 }
    );
  }

  try {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    let result = await FoodSchema.find({restaurant_id:id});

    const success = result.length > 0;
    return NextResponse.json({ result, success }, { status: 200 });
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  } 
}

export async function DELETE(request,content){
  const id = content.params.id;
  let success=false
  await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Missing restaurant ID' },
      { status: 400 }
    );
  }

  try {
    const result=await FoodSchema.deleteOne({_id:id});
    if(!result){
      return NextResponse.json({success, message:"Item not found", },{status:404})
    }
    if(result.deletedCount > 0){
      success=true
    }
    return NextResponse.json({result,success});
  } catch (error) {
    console.error('Error Deleting food items:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }

}
