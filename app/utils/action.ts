"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

// validation schema for registration form
const registerSchema = zfd.formData({
  name: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  email: zfd.text(z.string().email("Invalid email format")),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters")
  ),
});

export const registerAction = async (
  prevState: object | { message: string },
  formData: FormData
) => {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // handling validation errors
  if (!validatedFields.success) {
    const errors: Record<string, string[]> =
      validatedFields.error.flatten().fieldErrors;

    // Convert errors object to the desired format
    const formattedErrors: Record<string, string> = {};
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        formattedErrors[key] = errors[key][0];
      }
    }

    return formattedErrors;
  }

  /* Work in Progress
  const profilepic = formData.get("profile") as File;

  const imageReader = profilepic.stream().getReader();
  const imageDataU8: number[] = [];

  while (true) {
    const { done, value } = await imageReader.read();
    if (done) break;

    imageDataU8.push(...value);
  }

  const imageBinary = Buffer.from(imageDataU8, "binary");
  // console.log(imageBinary.toString());

  */

  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    // image: imageBinary.toString(),
  };

  try {
    // pass formdata as body to register api
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 403) {
      return { message: "User Already Exists" };
    }
    if (res.ok) {
      redirect("/login");
    }
  } catch (err) {
    return { message: "Something went wrong" };
  }
  return { message: "" };
};
