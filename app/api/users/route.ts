import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { IUser } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("User api");

  try {
    await connectMongoDB();
    const email = request.nextUrl.searchParams.get("email");
    console.log(email);

    if (email) {
      const data = await User.findOne({ email: email }).lean();
      if (data) {
        const user: IUser = { ...data, _id: data?._id.toString() };
        return NextResponse.json({ user }, { status: 200 });
      }
    }

    const data = await User.find().lean();

    // Convert ObjectId to string format
    const users: IUser[] = data.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("An error occurred while fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
