import { getUserID } from "@/app/utils/user-services/getUser";
import Courses from "@/components/courses/Courses";
import Filter from "@/components/filter/Filter";
import NoDataAvailable from "@/components/no-data/NoDataAvailable";
import { CoursesAPIResponse, IUser } from "@/types/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const getMyCourses = async () => {
  const session = await getServerSession();
  const email = session?.user.email;

  if (email) {
    const res = await fetch(
      `${process.env.BASE_URL}/api/courses?email=${email}`
    );

    const data: CoursesAPIResponse = await res.json();

    return data.courses;
  }
};

const MyCourses = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  const email = session?.user.email;
  const courses = await getMyCourses();
  const userId = await getUserID(email!);

  if (userId !== params.id) {
    notFound();
  }

  return (
    <>
      <div className=" mx-auto max-w-[100%] md:max-w-[60%] h-[100%] overflow-hidden">
        {courses?.[0] ? <Courses courses={courses} /> : <NoDataAvailable />}
      </div>
    </>
  );
};

export default MyCourses;
