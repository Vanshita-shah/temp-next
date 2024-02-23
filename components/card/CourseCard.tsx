import { getUser } from "@/app/utils/user-services/getUser";
import { ICourse, IUser } from "@/types/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import CourseCardActions from "./CourseCardActions";

const CourseCard = async ({
  course,
  users,
}: {
  course: ICourse;
  users: IUser[];
}) => {
  const session = await getServerSession();
  const currentUser = session?.user.email;
  // console.log(course);

  const userData = users.filter((user) => user.email === course.creator)[0];
  return (
    <>
      <div className="border border-gray-400 rounded ">
        <div className="p-4">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {course.courseName}
          </div>
          <p className="text-gray-700 text-base">{course.description}</p>
        </div>
        <div className="flex items-center border-t p-3 bg-primary-light">
          <Image
            className="w-10 h-10 rounded-full mr-5 ring-2 ring-white"
            src={userData.image}
            alt="Avatar of Writer"
            width={40}
            height={40}
          />

          <div className="text-sm">
            <p className="text-gray-900 leading-none">{course.creator}</p>
          </div>
          {course.creator === currentUser && (
            <div className="flex-1 flex items-center justify-end gap-2 text-[1.2rem] ">
              <CourseCardActions course={course} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseCard;
