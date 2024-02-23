import Courses from "@/components/courses/Courses";
import CoursesContainer from "@/components/courses/CoursesContainer";
import Filter from "@/components/filter/Filter";
import { CoursesAPIResponse } from "@/types/types";

const getCourses = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/courses`, {
      cache: "no-cache",
    });

    const data: CoursesAPIResponse = await res.json();
    return data.courses;
  } catch (err) {
    console.log(err);
  }
};

const Dashboard = async () => {
  const courses = await getCourses();

  return (
    <>
      <div className=" mx-auto max-w-[100%] md:max-w-[60%] h-[100%] overflow-hidden">
        <Filter />
        {courses && <Courses courses={courses} />}
        {/* {courses && <CoursesContainer courses={courses} />} */}
      </div>
    </>
  );
};

export default Dashboard;
