import { orderModel } from "@/app/lib/OrderModel";
import { NextResponse } from "next/server";


// changing the status of the order

export async function PATCH(request, content) {
    const payload = await request.json();
    const { orderId } = content.params;

    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, payload, { new: true });

        if (!updatedOrder) {
            return NextResponse.json(
                { success: false, message: "Cannot update the status" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Status updated successfully",
                result: updatedOrder.status, // return only status if desired
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}   