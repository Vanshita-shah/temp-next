import { CourseAPIResponse, CoursesAPIResponse } from "@/types/types";

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

export const getCourses = async (query?: string) => {
  try {
    const url = query ? `api/courses?query=${query}` : "api/courses";

    const res = await fetch(`${process.env.BASE_URL}/${url}`, {
      next: { tags: ["courses"] },
    });

    const data: CoursesAPIResponse = await res.json();
    // console.log(data);

    return data.courses;
  } catch (err) {
    console.log(err);
  }
};
