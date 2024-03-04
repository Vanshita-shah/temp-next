import CourseForm from "@/components/form/CourseForm";
import Modal from "@/components/modal/modal";
import React from "react";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

const page = async ({ params }: { params: { id: string } }) => {
  const courseData = await getCourse(params.id);
  const session = await getServerSession();

  if (!courseData || session?.user.email !== courseData.creator) {
    notFound();
  }

  return (
    <Modal>
      <div className="bg-white p-5 w-[300px] sm:w-[80%] xl:w-[70%] 2xl:w-[40%] 2xl:min-w-[400px] max-w-fit">
        <CourseForm courseData={courseData} isModel={true} />
      </div>
    </Modal>
  );
};

export default page;
