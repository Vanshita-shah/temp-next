"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { convertImageToURL } from "../cloudinary/imageConverter";
import { getCourse } from "../course-services/CourseServices";
import { ICourse } from "@/types/types";
import { zfd } from "zod-form-data";
import { z } from "zod";

// validation schema for registration form
const courseSchema = zfd.formData({
  courseName: zfd.text(z.string().min(5, "Too short").max(20, "Too long")),
  description: zfd.text(z.string().min(10, "Too short").max(100, "Too long")),

  courseImage: z
    .any()
    .refine((file) => file.name !== "undefined", "Course thumnail is required.")
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`),
});

export const courseAction = async (
  prevState: object | { message: string },
  formData: FormData
) => {
  const session = await getServerSession();

  //if session exists
  if (session) {
    const validatedFields = courseSchema.safeParse({
      courseName: formData.get("course-name") as string,
      description: formData.get("course-description") as string,
      courseImage: formData.get("form-image") as File,
    });

    // handling validation errors
    if (!validatedFields.success) {
      const errors: Record<string, string[]> =
        validatedFields.error.flatten().fieldErrors;

      // Convert errors object to the desired format
      const formattedErrors: Record<string, string> = {};
      for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
          formattedErrors[key] = errors[key][0];
        }
      }
      console.log(formattedErrors);

      return formattedErrors;
    }

    const email = session.user.email;

    const prerequisitesString = formData.get("course-prerequisite") as string;
    const prerequisites = prerequisitesString.split(",");

    const courseImg = formData.get("form-image") as File;

    const imageURL = await convertImageToURL(courseImg);

    //course data
    const body = {
      creator: email,
      courseName: formData.get("course-name") as string,
      description: formData.get("course-description") as string,
      prerequisites: prerequisites,
      link: formData.get("course-link") as string,
      courseImage: imageURL,
    };

    try {
      //send course data as body to post api
      const res = await fetch(
        `${process.env.BASE_URL}/api/courses/add-course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (res.ok) {
        revalidateTag("courses");
      } else if (res.status === 403) {
        //course name conflict
        return { message: "Course Name Already Exists" };
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err: any) {
      if (err.message.includes("NEXT_REDIRECT")) {
        redirect("/courses");
      }
      return { message: "Something went wrong" };
    }
    redirect("/courses");
  } else {
    return { message: "something went wrong" };
  }
};

export const deleteAction = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/courses/delete-course`,
      {
        // Using method DELETE to delete data
        method: "DELETE",
        body: JSON.stringify(id),
      }
    );

    if (res.ok) {
      revalidateTag("courses");
      return { message: "Course Deleted Successfully!" };
    }
  } catch (err) {
    return { message: "Something went wrong!" };
  }
  return { message: "Something went wrong!" };
};

export const editCourseAction = async (
  prevState: object | { message: string },
  formData: FormData
) => {
  const courseId = formData.get("courseId") as string;
  const courseData = (await getCourse(courseId)) as ICourse;

  const prerequisitesString = formData.get("course-prerequisite") as string;
  const prerequisites = prerequisitesString.split(",");

  const courseImg = formData.get("form-image") as File;
  let imageURL = courseData.courseImage;
  if (courseImg.name !== "undefined") {
    imageURL = await convertImageToURL(courseImg);
  }

  const editedCourseData: Omit<ICourse, "_id" | "creator"> = {
    courseName: formData.get("course-name") as string,
    description: formData.get("course-description") as string,
    prerequisites: prerequisites,
    link: formData.get("course-link") as string,
    courseImage: imageURL,
  };

  // return if there is no update

  const isEqual = (editedCourseData: Omit<ICourse, "_id" | "creator">) => {
    const keys = Object.keys(editedCourseData).filter((key) => key !== "_id");
    for (let key of keys) {
      if (!(key in courseData)) {
        return false;
      }
      if (
        JSON.stringify(courseData[key]) !==
        JSON.stringify(editedCourseData[key])
      ) {
        return false;
      }
    }
    return true;
  };

  if (isEqual(editedCourseData)) {
    return { message: "Nothing to Update!" };
  }

  // upadate database

  try {
    //send course data as body to post api
    const res = await fetch(`${process.env.BASE_URL}/api/courses/edit-course`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify([editedCourseData, courseData._id]),
    });
    if (res.ok) {
      revalidateTag("courses");
    } else if (res.status === 403) {
      //course name conflict
      return { message: "Course Name Already Exists" };
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err: any) {
    return { message: "Something went wrong" };
  }
  redirect("/courses");
};
