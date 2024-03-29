import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Course from "@/models/course";
import { verifyToken } from "../../tokenHandler";

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    await connectMongoDB();

    if (id) {
      const decoded = await verifyToken(request);

      // get course data based on courseId
      const course = await Course.findById(id);

      //Only authorized user can perform this action
      if (decoded.email !== course?.creator) {
        return NextResponse.json(
          { message: "Unauthorized Access!" },
          { status: 401 }
        );
      }

      // Deleting user based on its id
      const resp = await Course.deleteOne({ _id: new ObjectId(id) });

      if (resp.deletedCount === 1) {
        return NextResponse.json(
          { message: "Record deleted successfully" },
          { status: 200 }
        );
      } else {
        throw new Error("Record not found");
      }
    } else {
      throw new Error("ID is required for deletion");
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 401 }
    );
  }
}
