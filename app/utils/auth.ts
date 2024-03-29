import User from "@/models/user";
import { User as AuthUser, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import {
  JWTCallbackParams,
  SessionCallbackParams,
  SignInParams,
} from "@/types/types";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<AuthUser | null> => {
        await connectMongoDB();

        try {
          if (credentials) {
            // Check if user exists

            const user = await User.findOne({ email: credentials.email });

            if (user) {
              if (user.provider === "credentials" && user.password) {
                // Check if password is correct
                const isPasswordCorrect = await bcrypt.compare(
                  credentials.password,
                  user.password
                );

                if (isPasswordCorrect) {
                  return user as AuthUser;
                } else {
                  throw new Error("invalid password");
                }
              } else {
                throw new Error("User already exists with different provider!");
              }
            } else {
              throw new Error("User doesn't exist");
            }
          }
          return null;
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }: SignInParams) {
      if (account && account.provider == "credentials") {
        return true;
      }

      if (account && account.provider == "google") {
        await connectMongoDB();

        try {
          const existingUser = await User.findOne({ email: user.email });
          // If user does not exist : New user
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "google",
            });

            await newUser.save();
          } else {
            if (existingUser.provider !== "google")
              throw new Error("User already exists with different provider!");

            return true;
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          return null;
        }
      }

      if (account && account.provider == "github") {
        await connectMongoDB();

        try {
          const existingUser = await User.findOne({ email: user.email });
          // If user does not exist : New user
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "github",
            });

            await newUser.save();
          } else {
            if (existingUser.provider !== "github")
              throw new Error("User already exists with different provider!");
            return true;
          }
          return true;
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          return null;
        }
      }

      return false;
    },

    async jwt({
      token,
      user,
      account,
    }: JWTCallbackParams): Promise<JWT | undefined> {
      //
      if (Date.now() < token.accessTokenExpires - 100000 || 0) {
        return token;
      }

      if (account) {
        switch (account.provider) {
          case "credentials":
            const jwtPayload = {
              id: user.id,
              email: user.email,
            };

            const jwtToken = jwt.sign(jwtPayload, process.env.NEXTAUTH_SECRET!);

            return {
              provider: account.provider,
              accessToken: jwtToken,
              accessTokenExpires: Date.now() + 105000,
              user,
            };
          case "google":
            return {
              provider: account.provider,
              accessToken: account.id_token!,
              accessTokenExpires: Date.now() + 105000,
              user,
            };
          case "github":
            return {
              provider: account.provider,
              accessToken: account.access_token!,
              accessTokenExpires: Date.now() + 105000,
              user,
            };
        }
      }
    },

    //Session callback
    async session({ session, token }: SessionCallbackParams) {
      if (session && token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.expires = token.accessTokenExpires.toString();
        session.expire_time = token.accessTokenExpires;
        session.provider = token.provider;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt" as SessionStrategy,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
