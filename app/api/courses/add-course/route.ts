import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import { ICourse } from "@/types/types";

export async function POST(req: Request) {
  try {
    const body: ICourse = await req.json();
    await connectMongoDB();

    const course = await Course.findOne({ courseName: body.courseName });

    //when course-name already exists
    if (course !== null) {
      return NextResponse.json(
        { message: "course name already exists" },
        { status: 403 }
      );
    }

    //new course
    await Course.create(body);

    return NextResponse.json({ message: "course added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding the course.", error },
      { status: 500 }
    );
  }
}
