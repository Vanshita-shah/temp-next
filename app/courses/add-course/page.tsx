import CourseForm from "@/components/form/CourseForm";
import React from "react";

const AddCoursePage = () => {
  return (
    <div className="flex justify-center items-center h-[100%] ">
      <div className="h-[100%] pt-[4rem] max-w-[100%]">
        <div className="w-[80%] min-w-[300px] sm:w-auto gap-3 shadow-lg p-5 rounded-lg border-t-4 border-border-color mx-auto">
          <h1 className="text-xl font-bold my-4">Add Course</h1>
          <CourseForm />
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
