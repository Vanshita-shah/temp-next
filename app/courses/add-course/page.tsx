import CourseForm from "@/components/form/CourseForm";
import React from "react";

const AddCoursePage = () => {
  return (
    <div className="grid place-items-center h-[100%] ">
      <div className="gap-3 shadow-lg p-5 rounded-lg border-t-4 border-border-color">
        <h1 className="text-xl font-bold my-4">Add Course</h1>
        <CourseForm />
      </div>
    </div>
  );
};

export default AddCoursePage;
