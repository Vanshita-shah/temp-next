import { CourseAPIResponse, CoursesAPIResponse } from "@/types/types";

// get coursedata based on id
export const getCourse = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/courses?id=${id}`, {
    next: { tags: ["course"] },
  });

  if (!res.ok) {
    return null;
  }
  const data: CourseAPIResponse = await res.json();
  return data.course[0];
};

// get courses based on query
export const getCourses = async (query?: string) => {
  // if query doesn't exist, get all courses
  const url = query ? `api/courses?query=${query}` : "api/courses";

  const res = await fetch(`${process.env.BASE_URL}/${url}`, {
    next: { tags: ["courses"] },
  });

  const data: CoursesAPIResponse = await res.json();

  return data.courses;
};

// get current user's courses or courses based on query
export const getMyCourses = async (email?: string, query?: string) => {
  const url = query ? `query=${query}` : "";

  if (email) {
    const res = await fetch(
      `${process.env.BASE_URL}/api/courses?email=${email}&${url}`
    );

    const data: CoursesAPIResponse = await res.json();

    return data.courses;
  }
};
