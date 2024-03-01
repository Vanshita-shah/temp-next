"use client";
import { useFormState } from "react-dom";
import Button from "./Button";
import {
  editCourseAction,
  courseAction,
} from "@/app/utils/actions/courseAction";
import ErrorMsg from "./ErrorMsg";
import FormImage from "./FormImage";
import { ICourse } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const CourseForm = ({
  courseData,
  isModel,
}: {
  courseData?: ICourse;
  isModel?: boolean;
}) => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const router = useRouter();

  const [state, formAction] = useFormState(
    courseData ? editCourseAction : courseAction,
    { message: "" }
  );
  const prerequisites = courseData?.prerequisites.join(",");

  if (state.message === "Course Edited Successfully") {
    router.back();
  }

  return (
    <form action={formAction} className="flex flex-col ">
      <label htmlFor="profile" className="mt-3">
        Course Image <span>*</span>
        <span className="text-gray-400 text-sm">.png/.jpg/.jpeg</span>
      </label>
      <FormImage courseImage={courseData ? courseData.courseImage : ""} />
      {state.courseImage && <ErrorMsg error={state.courseImage} />}
      <label htmlFor="course-name" className="mt-3">
        Name <span>*</span>
      </label>
      <input
        type="text"
        id="course-name"
        name="course-name"
        defaultValue={courseData ? courseData.courseName : ""}
        placeholder="Enter course name"
        required
      />
      {state.courseName && <ErrorMsg error={state.courseName} />}

      <label htmlFor="course-description" className="mt-3">
        Description <span>*</span>
      </label>
      <textarea
        id="course-description"
        name="course-description"
        defaultValue={courseData ? courseData.description : ""}
        placeholder="Enter description"
        required
      />
      {state.description && <ErrorMsg error={state.description} />}
      <label htmlFor="course-prerequisite" className="mt-3">
        Prerequisites <span>*</span>
      </label>
      <textarea
        id="course-prerequisite"
        name="course-prerequisite"
        placeholder="Enter comma seperated prerequisites"
        defaultValue={courseData ? prerequisites : ""}
        required
      />
      <label htmlFor="course-link" className="mt-3">
        Course-Link <span>*</span>
      </label>
      <textarea
        id="course-link"
        name="course-link"
        placeholder="Enter course link"
        defaultValue={courseData ? courseData.link : ""}
        required
      />
      {courseData && <input type="hidden" name="courseId" value={id} />}
      {state.message && <ErrorMsg error={state.message} />}
      <Button text={courseData ? "Edit Course" : "Add Course"} />
      {courseData && !isModel && (
        <Link
          className="text-right mt-2 hover:underline hover:text-primary"
          href={"/courses"}
        >
          Go Back to Dashboard
        </Link>
      )}
    </form>
  );
};

export default CourseForm;
