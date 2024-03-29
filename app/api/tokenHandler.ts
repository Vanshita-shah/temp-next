import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { headers } from "next/headers";
import { GithubEmailInfo, JWTPayload } from "@/types/types";

const client = new OAuth2Client();

export const verifyToken = async (req: NextRequest) => {
  // Retrieve headers from the request
  const headersList = headers();
  const authHeader = headersList.get("Authorization");
  const authProvider = headersList.get("Provider");

  // Validate the necessary headers
  if (!authHeader || !authHeader.startsWith("Bearer ") || !authProvider) {
    throw new Error("Unauthorized Access!");
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  // Decode the token based on the authentication provider
  let decoded: JWTPayload | TokenPayload | GithubEmailInfo;
  try {
    switch (authProvider) {
      case "credentials":
        decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JWTPayload;
        break;

      case "google":
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        decoded = ticket.getPayload()!;

        break;

      case "github":
        const res = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data: GithubEmailInfo[] = await res.json();

        const publicEmail = data.find(
          (object) => object.visibility === "public"
        );
        if (publicEmail) decoded = publicEmail;
        else throw new Error("Missing public email on GitHub");

        break;

      default:
        throw new Error("Unsupported provider");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Invalid Token or Unsupported provider");
  }

  // Return the decoded payload
  return decoded;
};
