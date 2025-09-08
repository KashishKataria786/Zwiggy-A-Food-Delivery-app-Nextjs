import connectDatabase, { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";



// API for Getting Restaurant Details and Also Backend Filtering As well
export async function GET(request) {
  try {
    await connectDatabase();

    const queryParams = request.nextUrl.searchParams;
    let filter = {};

    if (queryParams.get("location")) {
      const city = queryParams.get("location");
      filter = { city: { $regex: new RegExp(city, "i") } };
    } else if (queryParams.get("restaurant")) {
      const restaurantName = queryParams.get("restaurant");
      filter = { restaurantName: { $regex: new RegExp(restaurantName, "i") } };
    } 

    const result = await restaurantSchema.find(filter);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, message: "No restaurants found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, result },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
