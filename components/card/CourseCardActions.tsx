"use client";
import { deleteAction } from "@/app/utils/actions/courseAction";
import { ICourse } from "@/types/types";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const CourseCardActions = ({ course }: { course: ICourse }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const deleteHandler = async () => {
    const shouldDelete = confirm("Are You Sure?");
    if (shouldDelete) {
      try {
        const res = await deleteAction(course._id);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else return;
  };
  const viewHandler = () => {
    router.push(`/courses/view/${course._id}`);
  };

  const editHandler = () => {
    router.push(`/courses/edit/${course._id}`);
  };

  return (
    <>
      <FaEye
        className="fill-primary duration-300 hover:fill-primary-dark hover:scale-110"
        onClick={viewHandler}
      />
      <MdEdit
        className="fill-primary duration-300 hover:fill-primary-dark hover:scale-110"
        onClick={editHandler}
      />
      <MdDelete
        className="fill-primary duration-300 hover:fill-primary-dark hover:scale-110"
        onClick={deleteHandler}
      />
    </>
  );
};

export default CourseCardActions;
