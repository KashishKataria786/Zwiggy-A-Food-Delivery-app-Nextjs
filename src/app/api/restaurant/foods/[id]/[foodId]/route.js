import connectDatabase from "@/app/lib/db";
import { FoodSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

export async function GET(request,content){
    await connectDatabase();
    const {foodId}= await content.params;
    const result = await FoodSchema.findOne({_id:foodId});
    return NextResponse.json({result,success:true})
}