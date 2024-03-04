import { CoursesAPIResponse, IUser } from "@/types/types";

// get all users data array
export const getAllUsers = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/users`, {
    next: { tags: ["users"] },
  });
  const data: { users: IUser[] } = await res.json();

  return data.users;
};

// get userdata based on email
export const getUser = async (email: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/users?email=${email}`);
  const data: { user: IUser } = await res.json();
  return data.user;
};

// get userId based on email
export const getUserID = async (email: string) => {
  if (email) {
    const userData = await getUser(email);
    return userData._id;
  }
};
