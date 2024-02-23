import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Course from "@/models/course";

export async function DELETE(req: Request) {
  // const id = "1";
  const id = await req.json();
  console.log("here is the id", id);
  await connectMongoDB();

  try {
    if (id) {
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
// 65c5c4d0bf73de1d10f23efa
// 65c5c4dfbf73de1d10f23efd
