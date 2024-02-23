import { ICourse } from "@/types/types";
import React from "react";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const courseData: ICourse = await getCourse(id);
  return (
    <div className="h-[100%] flex justify-center items-center p-5">
      <div className="max-h-[100%] max-w-[500px] flex flex-col  gap-10 justify-center overflow-hidden bg-gray-50 overflow-y-auto p-5 rounded-md shadow shadow-primary-light">
        <div className="">
          <Image
            className="max-w-[100%]"
            src={courseData.courseImage}
            alt=""
            width={500}
            height={500}
          />
        </div>
        <div>
          <h5 className="mb-2 text-2xl font-bold ">{courseData.courseName}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {courseData.description}
          </p>
          <h6 className="mb-1 text-lg font-bold ">Prerequisites :</h6>{" "}
          <ul className="px-5 pb-5">
            {courseData.prerequisites.map((prerequisite, idx) => (
              <li key={idx} className="list-disc">
                {prerequisite}
              </li>
            ))}
          </ul>
          <h6 className="mb-1 text-lg font-bold ">Link :</h6>
          <a
            href={courseData.link}
            target="_blank"
            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
          >
            {courseData.link}
          </a>
        </div>
      </div>
      <Link href={"/courses"}>Go To Dashboard</Link>
    </div>
  );
};

export default page;
