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
