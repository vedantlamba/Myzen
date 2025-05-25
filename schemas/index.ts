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

export const desFormSchema = z.object({
  description: z.string().min(2, {
    message: "Description is required!",
  }),
});

export const imageFormSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "Image is required!",
  }),
});

export const catFormSchema = z.object({
  categoryId: z.string().min(1, {
    message: "Category is required!",
  }),
});


export const priceFormSchema = z.object({
  price: z.coerce.number(),
});


export const attachmentFormSchema = z.object({
  url: z.string().min(1),
});

// Chapter Forms

export const ChaptersFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
});

export const chapterTitleFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required!",
  }),
});

export const ChapterDesformSchema = z.object({
  description: z.string().min(2, {
    message: "Chapter Description is required!",
  }),
});