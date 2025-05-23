import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(4, "Password must be of 3 letters."),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name Is Required"),
  email: z.string().email({
    message: "Email Is Required",
  }),
  password: z.string().min(4, "Password must be of 3 letters."),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});
export const ResetPasswordEmailSchema = z.object({
  password: z.string().min(3, "Password must be of 3 letters."),
});


// FORM

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Course name is required!",
  }),
});


// Course Forms

export const titleformSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required!",
  }),
});