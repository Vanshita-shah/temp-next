import NextAuth from "next-auth";

declare module "next-auth" {
  // override session interface
  interface Session {
    user: {
      email: string;
      password: string;
      image: string;
    };
  }
}
