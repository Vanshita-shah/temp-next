import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { IUser } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../tokenHandler";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  try {
    const decoded = await verifyToken(request);

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
      { status: 401 }
    );
  }
}
