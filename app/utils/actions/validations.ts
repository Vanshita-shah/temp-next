import { z } from "zod";
import { zfd } from "zod-form-data";

// validation schema for registration form
export const registerSchema = zfd.formData({
  name: zfd.text(
    z
      .string()
      .min(2, "Min 2 characters required!")
      .max(20, "Max 20 characters allowed!")
  ),
  email: zfd.text(z.string().email("Invalid email format!")),
  password: zfd.text(
    z.string().min(6, "Password must be at least 6 characters!")
  ),
  profile: z
    .any()
    .refine((file) => file.name !== "undefined", "Profile Pic is required!")
    .refine((file) => file.size <= 5000000, `Max file size is 5MB!`),
});

// validation schema for course form
export const courseSchema = zfd.formData({
  courseName: zfd.text(
    z
      .string()
      .min(5, "Min 5 characters required!")
      .max(20, "Max 20 characters allowed!")
  ),
  description: zfd.text(
    z
      .string()
      .min(10, "Min 10 characters required!")
      .max(100, "Max 100 characters allowed!")
  ),

  courseImage: z
    .any()
    .refine(
      (file) => file.name !== "undefined",
      "Course thumbnail is required!"
    )
    .refine((file) => file.size <= 5000000, `Max file size is 5MB!`),
});

// validation schema for edit form
export const editCourseSchema = zfd.formData({
  courseName: zfd.text(
    z
      .string()
      .min(5, "Min 5 characters required!")
      .max(20, "Max 20 characters allowed!")
  ),
  description: zfd.text(
    z
      .string()
      .min(10, "Min 10 characters required!")
      .max(100, "Max 100 characters allowed!")
  ),
});
