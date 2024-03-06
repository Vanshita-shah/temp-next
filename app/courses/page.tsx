import Courses from "@/components/courses/Courses";
import Filter from "@/components/filter/Filter";
import Loader from "@/components/loader/Loader";
import NoDataAvailable from "@/components/no-data/NoDataAvailable";
import { Suspense } from "react";
import { getCourses } from "../utils/course-services/CourseServices";
import Link from "next/link";
import { DashboardPageProps } from "@/types/types";

const Dashboard = async ({ searchParams }: DashboardPageProps) => {
  // Fetch all course if searchQuery is not there, else fetch based on searchQuery
  const courses = await getCourses(searchParams?.query);

  return (
    <>
      <div className=" mx-auto max-w-[100%] md:max-w-[60%] h-[100%] overflow-hidden">
        <Filter />
        {searchParams?.query && (
          <Link className="w-[100%] block text-center" href={"/courses"}>
            Go Back to all courses
          </Link>
        )}
        {courses && courses?.[0] ? (
          searchParams?.query ? (
            <Suspense fallback={<Loader />}>
              <Courses courses={courses} />
            </Suspense>
          ) : (
            <Courses courses={courses} />
          )
        ) : (
          <NoDataAvailable />
        )}
      </div>
    </>
  );
};

export default Dashboard;
