import { connectionStr } from "@/app/lib/db";
import { FoodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    const id = content.params.id;
    let success =false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const result = await FoodSchema.findOne({_id:id})
    if(result)success=true;

    return NextResponse.json({result,success});
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const payload = await request.json();

    // Connect once (avoid reconnecting every time)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const result = await FoodSchema.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true } // return updated doc
    );

    const success = !!result;

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}