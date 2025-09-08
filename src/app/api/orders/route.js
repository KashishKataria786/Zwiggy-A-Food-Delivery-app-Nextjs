import connectDatabase from "@/app/lib/db";
import { orderModel } from "@/app/lib/OrderModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDatabase();
  try {
    const payload = await request.json();

    if (!payload || Object.keys(payload).length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid request payload" },
        { status: 400 }
      );
    }

    const order = new orderModel(payload);
    const result = await order.save();
    console.log("order: ",order);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Sorry! Order Not Placed" },
        { status: 422 }
      );
    }
   
    return NextResponse.json(
      { success: true, message: "Order Placed Successfully", result },
      { status: 201 }
    );
  } catch (error) {
    
    return NextResponse.json(
      { success: false, message: "Something Went Wrong", error: error.message },
      { status: 500 }
    );
  }
}
    
export async function GET(request,res){
  await connectDatabase();
try {
  const id = await request.nextUrl.searchParams.get('id');
  console.log(id)
  if(!id){
        return NextResponse.json({success:false,message:"Id not found"}, {status:400});
    }
  let result = await orderModel.find({user_Id:id});
  if(result.length ===0){
    return NextResponse.json({success:false,message:"No Result"},{status:400});
  }


  return NextResponse.json({success:true,message:"Got orders",result:result},{status:200});
} catch (error) {
  console.log(error)
  return NextResponse.json({success:false,message:"Something Went Wrong"},{status:500})
}
}

