import connectDatabase from "@/app/lib/db";
import { userModel } from "@/app/lib/userModel";
import { NextResponse } from "next/server";

export async function GET(request,content){
    await connectDatabase();
    const id= await content.params.id
    const result = await userModel.findOne({_id:id});
    return NextResponse.json({result,success:true});
    
}