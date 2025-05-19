"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { compare } from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Email doesn't exist!",
    };
  }

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return {
      error: "Email Does Not Exist",
    };
  }

  const isPasswordCorrect = await compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    return { error: "Invalid Password!" };
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid credentials." };
    }
    return { success: "Logged in successfully." };
  } catch (error) {
    // console.log(error);
    if (error instanceof AuthError) {
      // console.log(`AuthError Errors - ${error.name}`)
      switch (error.name) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return {
            error: "Something went wrong",
          };
      }
    }
    throw error;
  }
};