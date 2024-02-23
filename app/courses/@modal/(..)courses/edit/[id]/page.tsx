import CourseForm from "@/components/form/CourseForm";
import Modal from "@/components/modal/modal";
import { ICourse } from "@/types/types";
import React from "react";
import { getCourse } from "@/app/utils/course-services/CourseServices";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  const courseData: ICourse = await getCourse(params.id);

  if (!courseData || session?.user.email !== courseData.creator) {
    console.log(session?.user.email, courseData.creator);
    notFound();
  }

  return (
    <Modal>
      <div className="bg-white p-5">
        <CourseForm courseData={courseData} isModel={true} />
      </div>
    </Modal>
  );
};

export default page;
