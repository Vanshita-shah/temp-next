import { authOptions } from "@/app/utils/auth";
import { getMyCourses } from "@/app/utils/course-services/CourseServices";
import { getUserID } from "@/app/utils/user-services/getUser";
import Courses from "@/components/courses/Courses";
import Filter from "@/components/filter/Filter";
import NoDataAvailable from "@/components/no-data/NoDataAvailable";
import { MyCoursesPageProps } from "@/types/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const MyCourses = async ({ params, searchParams }: MyCoursesPageProps) => {
  const session = await getServerSession(authOptions);
  const email = session?.user.email;
  const userId = await getUserID(email!);
  const courses = await getMyCourses(email, searchParams?.query);

  // current user can only access their courses
  if (userId !== params.id) {
    notFound();
  }

  return (
    <>
      <div className=" mx-auto max-w-[100%] md:max-w-[60%] h-[100%] overflow-hidden">
        <Filter />
        {searchParams?.query && (
          <Link
            className="w-[100%] block text-center"
            href={`/courses/${params.id}`}
          >
            Go Back to My-Courses
          </Link>
        )}
        {courses?.[0] ? <Courses courses={courses} /> : <NoDataAvailable />}
      </div>
    </>
  );
};

export default MyCourses;
