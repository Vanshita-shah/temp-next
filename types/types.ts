import { Session } from "next-auth";
import { ReactNode } from "react";

// interface for course model
export interface ICourse {
  [key: string]: string | string[];
  _id: string;
  creator: string;
  courseName: string;
  description: string;
  prerequisites: string[];
  link: string;
  courseImage: string;
}

// interface for user model
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image: string;
}

export interface CoursesAPIResponse {
  courses: ICourse[];
}

export interface CourseAPIResponse {
  course: ICourse[];
}

export interface AuthProviderProps {
  session: Session | null;
  children: ReactNode;
}
