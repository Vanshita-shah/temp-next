import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  const id = request.nextUrl.searchParams.get("id");
  const query = request.nextUrl.searchParams.get("query");
  try {
    await connectMongoDB();
    if (email) {
      // get current user's courses based on query
      if (query) {
        const courses = await Course.find({
          $and: [
            { creator: email }, // Condition 1: Match documents where the creator field equals the provided email
            { courseName: { $regex: query, $options: "i" } }, // Condition 2: Match documents where the courseName field matches the query (case-insensitive)
          ],
        });
        return NextResponse.json({ courses }, { status: 200 });
      }

      // get current user's all courses
      const courses = await Course.find({ creator: email });
      return NextResponse.json({ courses }, { status: 200 });
    }

    // get course data based on courseId
    if (id) {
      const course = await Course.find({ _id: new ObjectId(id) });
      return NextResponse.json({ course }, { status: 200 });
    }

    // get all courses based on query
    if (query) {
      const courses = await Course.find({
        courseName: { $regex: query, $options: "i" },
      });

      return NextResponse.json({ courses }, { status: 200 });
    }

    // get all courses of all users
    const courses = await Course.find();

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding the course.", error },
      { status: 500 }
    );
  }
}
