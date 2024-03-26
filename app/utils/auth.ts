import User from "@/models/user";
import { User as AuthUser, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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

            if (user && user.password) {
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
      allowDangerousEmailAccountLinking: true, // sign in with different OAuth providers with same email
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
            });

            await newUser.save();
          }
          return true;
        } catch (err) {
          throw new Error("Error saving user");
        }
      }

      return false;
    },

    async jwt({
      token,
      user,
      account,
    }: JWTCallbackParams): Promise<JWT | null> {
      if (Date.now() < token.accessTokenExpires - 100000 || 0) {
        return token;
      }
      if (account) {
        // JWT payload with user information
        const jwtPayload = {
          id: user.id,
          email: user.email,
        };

        // Generate the JWT Token using NEXTAUTH_SECRET for signing
        const jwtToken = jwt.sign(jwtPayload, process.env.NEXTAUTH_SECRET!);

        return {
          accessToken: jwtToken,
          accessTokenExpires: Date.now() + 3600000, //1hr
          user,
        };
      } else {
        return null;
      }
    },

    //Session callback
    async session({ session, token }: SessionCallbackParams) {
      if (session && token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.expire_time = token.accessTokenExpires;
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
  },
};
