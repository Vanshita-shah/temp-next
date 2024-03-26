import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { IUser, JWTPayload } from "@/types/types";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  //Check for bearer token
  const headersList = headers();
  const authHeader = headersList.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Unauthorized Access!" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    //decode token and get jwt payload
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET!
    ) as JWTPayload;

    await connectMongoDB();

    // get userdata based on email
    if (email) {
      const data = await User.findOne({ email: email }).lean();
      if (data) {
        const user: IUser = { ...data, _id: data?._id.toString() };
        return NextResponse.json({ user }, { status: 200 });
      }
    }

    // get all users
    const data = await User.find().lean();

    // Convert ObjectId to string format
    const users: IUser[] = data.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 404 }
    );
  }
}
