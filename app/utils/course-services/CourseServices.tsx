import { CourseAPIResponse, CoursesAPIResponse } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { getAccessToken, getProvider } from "../sessionServices";

// get coursedata based on id
export const getCourse = async (id: string) => {
  try {
    const accessToken = await getAccessToken();
    const provider = await getProvider();

    const res = await fetch(`${process.env.BASE_URL}/api/courses?id=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Provider: `${provider}`,
      },
      next: { tags: ["course"] },
    });

    if (!res.ok) {
      return null;
    }
    const data: CourseAPIResponse = await res.json();
    return data.course[0];
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};

// get courses based on query
export const getCourses = async (query?: string) => {
  const accessToken = await getAccessToken();
  const provider = await getProvider();

  // if query doesn't exist, get all courses
  const url = query ? `api/courses?query=${query}` : "api/courses";

  try {
    const res = await fetch(`${process.env.BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Provider: `${provider}`,
      },
      next: { tags: ["courses"] },
    });

    const data: CoursesAPIResponse = await res.json();

    return data.courses;
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};

// get current user's courses or courses based on query
export const getMyCourses = async (email?: string, query?: string) => {
  const accessToken = await getAccessToken();
  const provider = await getProvider();

  try {
    const url = query ? `query=${query}` : "";

    if (email) {
      const res = await fetch(
        `${process.env.BASE_URL}/api/courses?email=${email}&${url}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Provider: `${provider}`,
          },
        }
      );

      const data: CoursesAPIResponse = await res.json();

      return data.courses;
    }
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};
