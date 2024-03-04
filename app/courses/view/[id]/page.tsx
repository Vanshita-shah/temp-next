import Image from "next/image";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import { notFound } from "next/navigation";
import { PageParams } from "@/types/types";
import Link from "next/link";
import CourseData from "@/components/viewPage/CourseData";

const ViewPage = async ({ params: { id } }: PageParams) => {
  // get courseData based on courseId
  const courseData = await getCourse(id);

  if (!courseData) {
    notFound();
  }

  return (
    <div className="h-[100%] pt-[4rem] flex justify-center items-center  ">
      <div className="h-[100%]">
        <div className=" w-[300px] sm:w-[400px] max-w-sm flex flex-col  gap-10 justify-center overflow-hidden bg-bg-color overflow-y-auto p-5 rounded-md shadow shadow-primary-light">
          <CourseData courseData={courseData} />
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
