import notFound from "@/app/courses/not-found";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import Modal from "@/components/modal/modal";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  // Fetch session
  const session = await getServerSession();
  const email = session?.user.email;

  // Fetch course data
  const courseData = await getCourse(id);

  // If course data is not found, render a "not found" page
  if (!courseData) {
    notFound();
  }

  // Render modal with course details if course data is available
  return (
    <>
      {courseData && (
        <Modal>
          <div className="h-[500px] w-[300px] sm:w-[350px] max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden ">
            <div className="w-[100%] h-[150px] sm:h-[250px] m-auto">
              <Image
                className="w-[100%] h-[100%] object-contain m-auto"
                src={courseData.courseImage}
                alt=""
                width={400}
                height={150}
              />
            </div>

            <div className="p-5 max-h-[50%] overflow-auto">
              <h5 className="mb-2 text-2xl font-bold">
                {courseData.courseName}
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {courseData.description}
              </p>

              <h6 className="mb-1 text-lg font-bold">Prerequisites :</h6>
              <ul className="px-5 pb-5">
                {courseData.prerequisites.map((prerequisite, idx) => (
                  <li key={idx} className="list-disc">
                    {prerequisite}
                  </li>
                ))}
              </ul>

              <h6 className="mb-1 text-lg font-bold">Link :</h6>
              <Link
                href={courseData.link}
                target="_blank"
                className="mb-3 font-normal text-gray-700 dark:text-gray-400"
              >
                {courseData.link}
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
