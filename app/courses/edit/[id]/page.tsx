import CourseForm from "@/components/form/CourseForm";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { PageParams } from "@/types/types";
import { authOptions } from "@/app/utils/auth";

const EditPage = async ({ params }: PageParams) => {
  // get courseData based on courseId
  const courseData = await getCourse(params.id);
  const session = await getServerSession(authOptions);

  // user can only edit their own courses
  if (!courseData || session?.user.email !== courseData.creator) {
    notFound();
  }

  return (
    <div className="grid place-items-center h-[100%] ">
      <div className="gap-3 w-[80%] mt-[2rem] min-w-[300px] sm:w-auto shadow-lg p-5 rounded-lg border-t-4 border-border-color">
        <h1 className="text-xl font-bold my-4">Edit Course</h1>
        <CourseForm courseData={courseData} />
      </div>
    </div>
  );
};

export default EditPage;
