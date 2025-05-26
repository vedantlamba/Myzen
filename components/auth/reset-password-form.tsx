"use client";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
// import { LoginSchema } from "@/schemas";
import { ResetPasswordSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import FormError from "./form-error";
import FormSuccess from "./form-success";
// import { DEFAULT_LOGIN_REDIRECT } from "@/route";
// import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
// import { resetPassword } from "@/actions/reset-password.action";

const ResetPasswordForm = () => {
  // const searchParams = useSearchParams();
  // const urlErrors =
  //   searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "Email linked with another provider."
  //     : "";
  // const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    // setError("");
    // setSuccess("");

    // startTransition(() => {
    //   resetPassword(values).then((data) => {
    //     if (data?.error) {
    //       setError(data.error);
    //     }

    //     if (data?.success) {
    //       setSuccess(data.success);
    //       // router.push(DEFAULT_LOGIN_REDIRECT);
    //     }
    //   });
    // });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <CardWrapper
        backBtnHref="/auth/login"
        backBtnLabel="Back To Login"
        header="Welcome Back"
        showSocial={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                variant="default"
                className="cursor-pointer"
              >
                Change Password
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

export default ResetPasswordForm;