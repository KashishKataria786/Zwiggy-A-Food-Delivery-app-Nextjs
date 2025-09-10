import connectDatabase from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";

export async function GET(request,content){
    await connectDatabase();
    const id= await content.params.id
    const result = await restaurantSchema.findOne({_id:id}).select('-password');
    return NextResponse.json({result,success:true});
    
}