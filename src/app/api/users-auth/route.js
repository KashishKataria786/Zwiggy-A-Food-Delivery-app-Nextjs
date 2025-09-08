import connectDatabase from "@/app/lib/db";
import { userModel } from "@/app/lib/userModel";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";


// Customer Registration API with JWT and Bcrypt 
export async function POST(request) {
  const payload = await request.json();
  await connectDatabase();

  try {
    const { name, email, password, city, address, contact } = payload;

    if (!name || !email || !password || !city || !address || !contact) {
      return NextResponse.json({ message: "Missing fields", success: false }, { status: 400 });
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false , message: "User Already Exist! Try Login In"},
        { status: 409 }
      );
    }

    const SaltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, SaltRounds);

    const user = await userModel.create({
      name,
      email: email.toLowerCase(), 
      password: hashedPassword,
      city,
      address,
      contact,
    });

    const token = JWT.sign(
      { sub: user._id.toString(), email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        result: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          city: user.city,
          address: user.address,
          contact: user.contact,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
