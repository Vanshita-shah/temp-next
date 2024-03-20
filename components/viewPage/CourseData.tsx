import Image from "next/image";
import { ICourse, PageParams } from "@/types/types";
import Link from "next/link";
const CourseData = ({
  courseData,
  isModal,
}: {
  courseData: ICourse;
  isModal?: boolean;
}) => {
  return (
    <>
      <div className="w-[100%] h-[150px] sm:h-[250px] m-auto relative">
        <Image
          className=" object-contain m-auto"
          src={courseData.courseImage}
          alt="course thumbnail"
          fill
        />
      </div>
      <div className={isModal ? "p-5 max-h-[50%] overflow-auto" : ""}>
        <h5 className="mb-2 text-2xl font-bold ">{courseData.courseName}</h5>
        <p className="mb-3 font-normal text-gray-dark">
          {courseData.description}
        </p>
        <h6 className="mb-1 text-lg font-bold ">Prerequisites :</h6>{" "}
        <ul className="px-5 pb-5">
          {courseData.prerequisites.map((prerequisite, idx) => (
            <li key={idx} className="list-disc text-gray-dark">
              {prerequisite}
            </li>
          ))}
        </ul>
        <h6 className="mb-1 text-lg font-bold ">Link :</h6>
        <Link
          href={courseData.link}
          target="_blank"
          className="mb-3 font-normal text-gray-dark "
        >
          {courseData.link}
        </Link>
      </div>
    </>
  );
};

export default CourseData;
