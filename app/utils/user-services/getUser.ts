import { IUser } from "@/types/types";
import { getAccessToken, getProvider } from "../sessionServices";

// get all users data array
export const getAllUsers = async () => {
  try {
    const accessToken = await getAccessToken();
    const provider = await getProvider();

    const res = await fetch(`${process.env.BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Provider: `${provider}`,
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
  const accessToken = await getAccessToken();
  const provider = await getProvider();

  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/users?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Provider: `${provider}`,
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
  } catch (err: any) {
    throw new Error(err.message as string);
  }
};
