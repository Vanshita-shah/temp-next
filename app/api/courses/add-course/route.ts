import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/course";
import { ICourse } from "@/types/types";

import { verifyToken } from "../../tokenHandler";

export async function POST(request: NextRequest) {
  try {
    const body: ICourse = await request.json();

    const decoded = await verifyToken(request);

    await connectMongoDB();

    const course = await Course.findOne({ courseName: body.courseName });

    //Only authorized user can perform this action
    if (!decoded.email || body.creator !== decoded.email.toString()) {
      return NextResponse.json(
        { message: "Unauthorized Access!" },
        { status: 401 }
      );
    }

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
      { message: (error as { message: string }).message },
      { status: 401 }
    );
  }
}
