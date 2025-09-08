import connectDatabase, { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";


// API for Getting The Locations for the Location Input Field on Homepage
export async function GET() {
  try {
    await connectDatabase();

    let result = await restaurantSchema.find({}, "city"); 

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, message: "No cities found" },
        { status: 404 }
      );
    }

    const uniqueCities = [...new Set(result.map((item) => item.city))];

    return NextResponse.json(
      { success: true, result: uniqueCities },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
