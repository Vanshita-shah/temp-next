import User from "@/models/user";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";

interface SignInParams {
  user: AuthUser;
  account: Account;
}

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
      if (account!.provider == "credentials") {
        return true;
      }

      if (account!.provider == "google") {
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
    },
  },
  pages: {
    signIn: "/login",
  },
};
