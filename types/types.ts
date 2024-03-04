import { Session } from "next-auth";
import { Dispatch, ReactNode, SetStateAction } from "react";

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

//Session provider props
export interface AuthProviderProps {
  session: Session | null;
  children: ReactNode;
}
/*---------------------------- Page props ---------------------------- */

export interface DashboardPageProps {
  searchParams?: {
    query?: string;
  };
}

// dynamic pages props
export interface PageParams {
  params: { id: string };
}

export interface MyCoursesPageProps extends DashboardPageProps, PageParams {}

/*---------------------------- Components props ---------------------------- */

// utility
export interface Courses {
  courses: ICourse[];
}
export interface Course {
  course: ICourse;
}

export interface Users {
  users: IUser[];
}

export interface User {
  users: IUser;
}

export interface CourseCardProps extends Course, Users {}

export interface CardActionsProps extends Course {
  currentUser?: string;
}

export interface CourseFormProps {
  courseData?: ICourse;
  isModel?: boolean;
}

export interface DeletePopUpProps {
  id: string;
  courseName: string;
  setShowPopUp: Dispatch<SetStateAction<boolean>>;
}

/*---------------------------- API response type ---------------------------- */
export interface CoursesAPIResponse {
  courses: ICourse[];
}

export interface CourseAPIResponse {
  course: ICourse[];
}
