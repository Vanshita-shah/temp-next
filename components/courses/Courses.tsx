import CourseCard from "../card/CourseCard";
import { Courses as CoursesProps } from "@/types/types";
import { getAllUsers } from "@/app/utils/user-services/getUser";

const Courses = async ({ courses }: CoursesProps) => {
  const users = await getAllUsers();

  return (
    <div className="flex flex-col gap-5 max-h-[80%] overflow-y-auto p-5 mt-5">
      {courses.map((course, idx) => (
        <CourseCard key={idx} course={course} users={users} />
      ))}
    </div>
  );
};

export default Courses;
