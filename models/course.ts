import { ICourse } from "@/types/types";
import mongoose, { Schema, Model } from "mongoose";

const courseSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
