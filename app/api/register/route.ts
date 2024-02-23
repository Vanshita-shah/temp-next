import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = { ...body, password: hashedPassword };

    await User.create(newUser);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
}
