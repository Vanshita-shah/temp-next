import Courses from "@/components/courses/Courses";
import Filter from "@/components/filter/Filter";
import Loader from "@/components/loader/Loader";
import NoDataAvailable from "@/components/no-data/NoDataAvailable";
import { CoursesAPIResponse } from "@/types/types";
import { Suspense } from "react";
import { getCourses } from "../utils/course-services/CourseServices";

const Dashboard = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const courses = await getCourses(searchParams?.query);

  return (
    <>
      <div className=" mx-auto max-w-[100%] md:max-w-[60%] h-[100%] overflow-hidden">
        <Filter />
        {searchParams?.query ? (
          courses && courses?.[0] ? (
            <Suspense fallback={<Loader />}>
              <Courses courses={courses} />
            </Suspense>
          ) : (
            <NoDataAvailable />
          )
        ) : courses && courses?.[0] ? (
          <Courses courses={courses} />
        ) : (
          <NoDataAvailable />
        )}
      </div>
    </>
  );
};

export default Dashboard;
