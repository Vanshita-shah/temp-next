import NextAuth from "next-auth";

declare module "next-auth" {
  // override session interface
  interface Session {
    user: User;
    accessToken: string;
    provider: "credentials" | "google" | "github";
    expire_time: number;
  }
}

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
    provider: "credentials" | "google" | "github";
  }
}
