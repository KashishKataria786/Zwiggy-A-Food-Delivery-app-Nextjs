import connectDatabase from "@/app/lib/db";
import { userModel } from "@/app/lib/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export async function POST(request) {
  await connectDatabase();

  try {
    const payload = await request.json();

    const { email, password } = payload;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing email or password.' },
        { status: 400 } 
      );
    }

    // Check for user
    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Compare password
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Ensure secret is defined
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    // Generate JWT token
    const token = JWT.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        name: user.name,
        address: user.address,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '7d' }
    );

    // Return response
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
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
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error.message || error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
