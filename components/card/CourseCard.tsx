import Image from "next/image";
import { getServerSession } from "next-auth";
import CourseCardActions from "./CourseCardActions";
import { CourseCardProps } from "@/types/types";

const CourseCard = async ({ course, users }: CourseCardProps) => {
  const session = await getServerSession();
  const currentUser = session?.user.email;

  // filter course creator's data
  const userData = users.filter((user) => user.email === course.creator)[0];

  return (
    <>
      <div className="border border-gray-400 rounded ">
        <div className="p-4">
          <div className=" font-bold text-xl mb-2">{course.courseName}</div>
          <p className="text-gray-dark text-base">{course.description}</p>
        </div>
        <div className="flex items-center border-t p-3 bg-primary-light">
          <Image
            className="w-10 h-10 rounded-full mr-5 ring-2 ring-white"
            src={userData?.image}
            alt="Avatar of Writer"
            width={40}
            height={40}
          />

          <div className="text-sm">
            <p>{course.creator}</p>
          </div>

          <div className="flex-1 flex items-center justify-end gap-2 text-[1.2rem] ">
            <CourseCardActions course={course} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
