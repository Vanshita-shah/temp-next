import NextAuth from "next-auth";

// overriding user interface
declare module "next-auth" {
  interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    image: string;
  }
}

// overriding JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    user: AuthUser;
    accessToken: string;
    accessTokenExpires: number;
  }
}
