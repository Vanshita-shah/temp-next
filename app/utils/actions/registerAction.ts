"use server";
import { registerSchema } from "./validations";
import {
  convertProfileToURL,
  dataURLtoFile,
} from "../cloudinary/imageConverter";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { formatErrors } from "./formatErrors";

export const registerAction = async (
  prevState: Record<string, string> | { message: string },
  formData: FormData
) => {
  const userName = formData.get("name") as string;
  const email = formData.get("email") as string;
  const croppedImage = formData.get("form-cropped-image") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  const profilepic = dataURLtoFile(croppedImage, `${userName}.png`);
  // validating fields according to zod schema
  const validatedFields = registerSchema.safeParse({
    name: userName,
    email: email,
    password: password,
    profile: profilepic,
  });

  // handling validation errors
  if (!validatedFields.success) {
    const errors: Record<string, string[]> =
      validatedFields.error.flatten().fieldErrors;
    // Convert errors object to the desired format {fieldName:<message>}
    const formattedErrors = formatErrors(errors);

    return formattedErrors;
  }

  // If passwords doesn't match
  if (confirmPassword !== password) {
    return { confirm: "Password doesn't match!" };
  }

  try {
    //convert profilepic file into cloudinary url
    const imageURL = await convertProfileToURL(croppedImage, userName);

    //user data
    const body = {
      name: userName,
      email: email,
      password: password,
      image: imageURL,
    };

    // pass user data as body to register api
    const res = await fetch(`${process.env.BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      // On new registeration, revalidate request having tag users
      revalidateTag("users");
    }

    if (res.status === 403) {
      return { message: "User Already Exists!" };
    }
  } catch (err) {
    return { message: "Something went wrong!" };
  }
  redirect("/login");
};
