import { CoursesAPIResponse, IUser } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

// get all users data array
export const getAllUsers = async () => {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const res = await fetch(`${process.env.BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["users"] },
    });
    const data: { users: IUser[] } = await res.json();

    return data.users;
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};

// get userdata based on email
export const getUser = async (email: string) => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/users?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data: { user: IUser } = await res.json();

    return data.user;
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};

// get userId based on email
export const getUserID = async (email: string) => {
  try {
    if (email) {
      const userData = await getUser(email);
      return userData._id;
    }
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};
