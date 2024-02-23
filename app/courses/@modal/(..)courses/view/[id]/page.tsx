import { getCourse } from "@/app/utils/course-services/CourseServices";
import Modal from "@/components/modal/modal";
import { CourseAPIResponse, ICourse } from "@/types/types";
import Image from "next/image";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const courseData: ICourse = await getCourse(id);
  return (
    <Modal>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden ">
        <div className="flex justify-center items-center h-[40%] border-b-2 border-gray-400">
          <Image
            className="h-[100%]  object-cover"
            src={courseData.courseImage}
            alt=""
            width={1000}
            height={1000}
          />
        </div>

        <div className="p-5 max-h-[60%] overflow-auto">
          <h5 className="mb-2 text-2xl font-bold ">{courseData.courseName}</h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {courseData.description}
          </p>

          <h6 className="mb-1 text-lg font-bold ">Prerequisites :</h6>
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
    </Modal>
  );
}
