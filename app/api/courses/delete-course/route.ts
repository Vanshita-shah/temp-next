import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Course from "@/models/course";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types/types";

export async function DELETE(req: Request) {
  const { id } = await req.json();

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

  await connectMongoDB();

  try {
    if (id) {
      //decode token and get jwt payload
      const decoded = jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET!
      ) as JWTPayload;

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
      { status: 404 }
    );
  }
}
