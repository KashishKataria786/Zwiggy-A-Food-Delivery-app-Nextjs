import connectDatabase from "@/app/lib/db"
import { orderModel } from "@/app/lib/OrderModel";
import { NextResponse } from "next/server";


export async function GET(request,content){
    await connectDatabase();
    const customerId  = await content.params.customerId;
    const result= await orderModel.find({user_Id:customerId});
    return NextResponse.json({result, success:true});
}