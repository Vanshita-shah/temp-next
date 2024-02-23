import { CourseAPIResponse } from "@/types/types";

export const getCourse = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/courses?id=${id}`);
  const data: CourseAPIResponse = await res.json();
  return data.course[0];
};
