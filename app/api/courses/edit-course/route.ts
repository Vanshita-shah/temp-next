import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Course from "@/models/course";
import { ICourse } from "@/types/types";
import { revalidateTag } from "next/cache";

export async function PUT(req: Request) {
  const body: [ICourse, string] = await req.json();
  const editedCourseData = body[0];
  const id = body[1];

  await connectMongoDB();

  try {
    if (id) {
      const existingCourse = await Course.findOne({
        courseName: editedCourseData.courseName,
      });

      //when course-name already exists
      if (existingCourse !== null) {
        return NextResponse.json(
          { message: "course name already exists" },
          { status: 403 }
        );
      }
      // Updating user based on its id
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
