import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { IUser } from "@/types/types";

export async function POST(req: Request) {
  try {
    console.log("register api");

    const body: IUser = await req.json();

    await connectMongoDB();
    const user = await User.findOne({ email: body.email });

    //when user already exists
    if (user !== null) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 403 }
      );
    }

    //newUser
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const newUser = { ...body, password: hashedPassword };

      await User.create(newUser);
      return NextResponse.json(
        { message: "User registered." },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
}
