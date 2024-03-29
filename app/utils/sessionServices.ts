import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getAccessToken = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;
  return accessToken;
};

export const getProvider = async () => {
  const session = await getServerSession(authOptions);
  const provider = session?.provider;
  return provider;
};
