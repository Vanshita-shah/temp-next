import { CoursesAPIResponse, IUser } from "@/types/types";

export const getAllUsers = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/users`);
  const data: { users: IUser[] } = await res.json();
  return data.users;
};

export const getUser = async (email: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/users?email=${email}`);
  const data: { user: IUser } = await res.json();
  return data.user;
};

export const getUserID = async (email: string) => {
  const userData = await getUser(email);
  return userData._id;
};
