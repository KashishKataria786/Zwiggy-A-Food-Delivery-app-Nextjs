import connectDatabase from "@/app/lib/db";
import { orderModel } from "@/app/lib/OrderModel";
import { NextResponse } from "next/server";


export async function GET(request, content) {
  await connectDatabase();
  try {
    const { id } =await content.params;
    console.log("Restaurant ID:", id);

    // Parse query params properly
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Id not found" },
        { status: 400 }
      );
    }

    // Build query
    const query = { restaurant_Id: id };
    if (status) {
      query.status = status;
    }

    const result = await orderModel.find(query);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, message: "No Result" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Got orders", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
