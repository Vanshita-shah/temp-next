"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { convertProfileToURL } from "../cloudinary/imageConverter";

// validation schema for course form
const registerSchema = zfd.formData({
  name: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  email: zfd.text(z.string().email("Invalid email format")),
  password: zfd.text(
    z.string().min(6, "Password must be at least 6 characters")
  ),
  profile: z
    .any()
    .refine((file) => file.name !== "undefined", "Profile Pic is required.")
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`),
});

export const registerAction = async (
  prevState: object | { message: string },
  formData: FormData
) => {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    profile: formData.get("form-image"),
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
    console.log(formattedErrors);

    return formattedErrors;
  }
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (confirmPassword !== password) {
    return { confirm: "Password doesn't match!" };
  }

  //convert profilepic into base64 string
  const profilepic = formData.get("form-image") as File;

  const imageURL = await convertProfileToURL(profilepic);

  //user data
  const body = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    image: imageURL,
  };

  try {
    // pass user data as body to register api
    const res = await fetch(`${process.env.BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 403) {
      return { message: "User Already Exists" };
    }
  } catch (err) {
    console.log(err);

    return { message: "Something went wrong" };
  }
  redirect("/login");
};
