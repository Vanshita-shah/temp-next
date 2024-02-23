import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Course from "@/models/course";
import { ICourse } from "@/types/types";

export async function PUT(req: Request) {
  const body: [ICourse, string] = await req.json();
  const editedCourseData = body[0];
  const id = body[1];

  await connectMongoDB();

  try {
    if (id) {
      // Updating user based on its id
      const resp = await Course.updateOne(
        { _id: new ObjectId(id) },
        editedCourseData
      );

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
