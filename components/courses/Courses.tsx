import React from "react";
import CourseCard from "../card/CourseCard";
import { ICourse } from "@/types/types";
import { getAllUsers } from "@/app/utils/user-services/getUser";

const Courses = async ({ courses }: { courses: ICourse[] }) => {
  const users = await getAllUsers();
  return (
    <div className="flex flex-col gap-5 h-[90%] overflow-y-auto p-5 mt-5">
      {courses.map((course, idx) => (
        <CourseCard key={idx} course={course} users={users} />
      ))}
    </div>
  );
};

export default Courses;
