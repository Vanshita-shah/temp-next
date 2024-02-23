import CourseForm from "@/components/form/CourseForm";
import React from "react";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import { ICourse } from "@/types/types";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const courseData: ICourse = await getCourse(params.id);
  // console.log("here", courseData);

  if (!courseData) {
    notFound();
  }

  return (
    <div className="grid place-items-center h-[100%] ">
      <div className="gap-3 shadow-lg p-5 rounded-lg border-t-4 border-border-color">
        <h1 className="text-xl font-bold my-4">Edit Course</h1>
        <CourseForm courseData={courseData} />
      </div>
    </div>
  );
};

export default page;
