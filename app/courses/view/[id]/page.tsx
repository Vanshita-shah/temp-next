import React from "react";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import Image from "next/image";
import { notFound } from "next/navigation";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const courseData = await getCourse(id);

  if (!courseData) {
    notFound();
  }

  return (
    <div className="h-[100%] pt-[4rem] flex justify-center items-center  ">
      <div className="h-[100%]">
        <div className=" w-[300px] sm:w-[350px] max-w-sm flex flex-col  gap-10 justify-center overflow-hidden bg-gray-50 overflow-y-auto p-5 rounded-md shadow shadow-primary-light">
          <div className="w-[100%] h-[150px] sm:h-[250px] m-auto">
            <Image
              className="w-[100%] h-[100%] object-contain m-auto"
              src={courseData.courseImage}
              alt=""
              width={400}
              height={150}
            />
          </div>
          <div>
            <h5 className="mb-2 text-2xl font-bold ">
              {courseData.courseName}
            </h5>
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
      </div>
    </div>
  );
};

export default page;
