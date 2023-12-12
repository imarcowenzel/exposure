import { z } from "zod";

export const logInSchema = z.object({
  email: z
    .string()
    .min(5)
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(15),
    email: z
      .string()
      .min(5)
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters.",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password confirmation does not match the password.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password must be at least 6 characters." }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters.",
    }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Password confirmation does not match the new password.",
    path: ["confirmPassword"],
  });

export const editProfileSchema = z.object({
  newUsername: z
    .string()
    .min(3, { message: "New username must be at least 3 characters." })
    .max(15),
});

export const deleteAccountSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});
