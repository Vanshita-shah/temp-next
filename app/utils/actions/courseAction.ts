"use server";

import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { convertImageToURL, dataURLtoFile } from "../cloudinary/imageConverter";
import { getCourse } from "../course-services/CourseServices";
import { ICourse } from "@/types/types";
import { deletePhotoFromCloudinary } from "../cloudinary/config";
import { courseSchema, editCourseSchema } from "./validations";
import { formatErrors } from "./formatErrors";
import { authOptions } from "../auth";
import { getAccessToken, getProvider } from "../sessionServices";

// Add course server action
export const courseAction = async (
  prevState: Record<string, string> | { message: string },
  formData: FormData
) => {
  const session = await getServerSession(authOptions);
  const courseName = formData.get("course-name") as string;
  const description = formData.get("course-description") as string;
  const prerequisitesString = formData.get("course-prerequisite") as string;
  const link = formData.get("course-link") as string;
  const croppedCourseImg = formData.get("form-cropped-image") as string;

  //Usage example:
  const courseImgFile = dataURLtoFile(croppedCourseImg, `${courseName}.png`);
  //if session exists
  if (session) {
    const validatedFields = courseSchema.safeParse({
      courseName: courseName,
      description: description,
      courseImage: courseImgFile,
    });

    // handling validation errors
    if (!validatedFields.success) {
      const errors: Record<string, string[]> =
        validatedFields.error.flatten().fieldErrors;

      // Convert errors object to the desired format {fieldName:<message>}
      const formattedErrors = formatErrors(errors);

      return formattedErrors;
    }

    const email = session.user.email;

    // convert prequisitesString into array
    const prerequisites = prerequisitesString.split(",");

    // convert course thumbnail into cloudinary url
    const imageURL = await convertImageToURL(croppedCourseImg, courseName);

    //course data
    const body = {
      creator: email,
      courseName: courseName,
      description: description,
      prerequisites: prerequisites,
      link: link,
      courseImage: imageURL,
    };

    try {
      const accessToken = await getAccessToken();
      const provider = await getProvider();

      //send course data as body to post api
      const res = await fetch(
        `${process.env.BASE_URL}/api/courses/add-course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Provider: `${provider}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (res.ok) {
        // on addition of new course,revalidate courses request
        revalidateTag("courses");
      } else if (res.status === 403) {
        //course name conflict
        return { message: "Course Name Already Exists" };
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      return { message: "Something went wrong" };
    }
    redirect("/courses");
  } else {
    return { message: "something went wrong" };
  }
};

// Delete course server action
export const deleteAction = async (id: string, courseName: string) => {
  try {
    const accessToken = await getAccessToken();
    const provider = await getProvider();

    const res = await fetch(
      `${process.env.BASE_URL}/api/courses/delete-course`,
      {
        // Using method DELETE to delete data
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Provider: `${provider}`,
        },
        body: JSON.stringify({ id: id }),
      }
    );

    // delete resources from cloudinary
    deletePhotoFromCloudinary(courseName);

    if (res.ok) {
      // revalidate courses request
      revalidateTag("courses");
      return { message: "Course Deleted Successfully!" };
    }
  } catch (err) {
    return { message: "Something went wrong!" };
  }
  return { message: "Something went wrong!" };
};

// Edit course server action
export const editCourseAction = async (
  prevState: Record<string, string> | { message: string },
  formData: FormData
) => {
  const courseId = formData.get("courseId") as string;
  const courseData = (await getCourse(courseId)) as ICourse;
  const courseName = formData.get("course-name") as string;
  const description = formData.get("course-description") as string;
  const link = formData.get("course-link") as string;
  const prerequisitesString = formData.get("course-prerequisite") as string;
  const prerequisites = prerequisitesString.split(",");
  const courseImg = formData.get("form-cropped-image") as string;
  let imageURL = courseData.courseImage;

  const validatedFields = editCourseSchema.safeParse({
    courseName: courseName,
    description: description,
  });

  // handling validation errors
  if (!validatedFields.success) {
    const errors: Record<string, string[]> =
      validatedFields.error.flatten().fieldErrors;

    // Convert errors object to the desired format {fieldName:<message>}
    const formattedErrors = formatErrors(errors);

    return formattedErrors;
  }

  // If user edits courseImg
  if (courseImg) {
    imageURL = await convertImageToURL(courseImg, courseData.courseName);
  }

  const editedCourseData: Omit<ICourse, "_id" | "creator"> = {
    courseName: courseName,
    description: description,
    prerequisites: prerequisites,
    link: link,
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
    const accessToken = await getAccessToken();
    const provider = await getProvider();

    //send course data as body to post api
    const res = await fetch(`${process.env.BASE_URL}/api/courses/edit-course`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Provider: `${provider}`,
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
  } catch (err) {
    return { message: "Something went wrong" };
  }
  redirect("/courses");
};
