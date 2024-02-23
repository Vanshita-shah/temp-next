import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const id = request.nextUrl.searchParams.get("id");

    await connectMongoDB();
    if (email) {
      const courses = await Course.find({ creator: email });
      return NextResponse.json({ courses }, { status: 200 });
    }

    if (id) {
      const course = await Course.find({ _id: new ObjectId(id) });
      return NextResponse.json({ course }, { status: 200 });
    }
    const courses = await Course.find();

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving courses:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the course.", error },
      { status: 500 }
    );
  }
}
