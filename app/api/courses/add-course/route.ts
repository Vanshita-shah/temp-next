import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import { ICourse, JWTPayload } from "@/types/types";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body: ICourse = await req.json();

    //Check for bearer token
    const headersList = headers();
    const authHeader = headersList.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized Access!" },
        { status: 401 }
      );
    }

    //decode token and get Jwt payload
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET!
    ) as JWTPayload;

    await connectMongoDB();

    const course = await Course.findOne({ courseName: body.courseName });

    //Only authorized user can perform this action
    if (body.creator !== decoded.email.toString()) {
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
      { status: 404 }
    );
  }
}
