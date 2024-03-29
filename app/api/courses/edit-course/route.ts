import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Course from "@/models/course";
import { ICourse, JWTPayload } from "@/types/types";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../tokenHandler";

export async function PUT(request: NextRequest) {
  const body: [ICourse, string] = await request.json();

  const editedCourseData = body[0];
  const id = body[1];

  await connectMongoDB();

  try {
    if (id) {
      const decoded = await verifyToken(request);

      // get course data based on courseId
      const course = await Course.findById(id);
      const existingCourse = await Course.findOne({
        courseName: editedCourseData.courseName,
      });

      //Only authorized user can perform this action
      if (decoded.email !== course?.creator) {
        return NextResponse.json(
          { message: "Unauthorized Access!" },
          { status: 401 }
        );
      }

      //when course-name already exists
      if (
        existingCourse &&
        existingCourse._id.toString() !== course?._id.toString()
      ) {
        return NextResponse.json(
          { message: "course name already exists" },
          { status: 403 }
        );
      }

      // Updating course based on its id
      const resp = await Course.updateOne(
        { _id: new ObjectId(id) },
        editedCourseData
      );

      revalidateTag("course");

      return NextResponse.json(
        { message: "Record Updated successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("ID is required for deletion");
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 404 }
    );
  }
}
