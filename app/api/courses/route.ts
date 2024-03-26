import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types/types";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  const id = request.nextUrl.searchParams.get("id");
  const query = request.nextUrl.searchParams.get("query");

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

    if (email) {
      if (email !== decoded.email.toString()) {
        return NextResponse.json(
          { message: "Unauthorized Access!" },
          { status: 401 }
        );
      }

      if (query) {
        // get current user's courses based on query
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
      { message: (error as { message: string }).message },
      { status: 404 }
    );
  }
}
