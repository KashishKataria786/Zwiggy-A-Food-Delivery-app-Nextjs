import { orderModel } from "@/app/lib/OrderModel";
import { NextResponse } from "next/server";


// changing the status of the order
export async function PATCH(request,content){
    let payload= await  request.json();
    const {orderId} = await content.params;
    try {
        let response = await orderModel.findByIdAndUpdate(orderId,payload,{new:true});
        if(!response){
            return NextResponse.json({success:false, message:"Cannot update the Stsus"}, {status:202});
        }
        return NextResponse.json({success:true, message:"Status updated successfully"}, {status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false, message:"Internal Server Error"},{status:500})
    }
}