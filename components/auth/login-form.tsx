"use client";
//TODO: PROVIDERS
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "./card-wrapper";
import Link from "next/link";
import { Button } from "../ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import Image from "next/image";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            router.push(DEFAULT_LOGIN_REDIRECT);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="bg-accent flex flex-col justify-center overflow-y-hidden items-center h-screen">
      <CardWrapper
        backBtnHref="/auth/register"
        backBtnLabel="Create an account"
        header="Welcome Back"
        showSocial={true}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <button className="text-xs underline-offset-4 hover:underline">
                  <Link href="/auth/reset">Forget password</Link>
                </button>
              </div>
              <Button disabled={isPending} className="cursor-pointer">
                Sign In
              </Button>

              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;
