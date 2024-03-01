"use client";
import { deleteAction } from "@/app/utils/actions/courseAction";
import { ICourse } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import DeletePopup from "../modal/DeletePopup";

const CourseCardActions = ({
  course,
  currentUser,
}: {
  course: ICourse;
  currentUser?: string;
}) => {
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState(false);

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
      {course.creator === currentUser && (
        <>
          <MdEdit
            className="fill-primary duration-300 hover:fill-primary-dark hover:scale-110"
            onClick={editHandler}
          />
          <MdDelete
            className="fill-primary duration-300 hover:fill-primary-dark hover:scale-110"
            onClick={() => setShowPopUp(true)}
          />
          {showPopUp && (
            <DeletePopup
              setShowPopUp={setShowPopUp}
              id={course._id}
              courseName={course.courseName}
            />
          )}
        </>
      )}
    </>
  );
};

export default CourseCardActions;
