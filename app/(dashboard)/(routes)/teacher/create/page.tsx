"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  errorToast,
  SuccessToaster,
} from "@/components/providers/toast-providers";
import { formSchema } from "@/schemas";
const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${res.data.id}`);
      SuccessToaster();
    } catch {
      // console.log("Something went wrong!");
      errorToast();
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex justify-center items-center h-full p-6">
      <div className="md:text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1F1F1F] tracking-tight">
          What&apos;s Your Course Called?
        </h1>
        <p className="text-sm text-muted-foreground">
          Make it memorable, make it yours.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Machine Learning Made Simple'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-3">
              <Link href="/">
                <Button className="cursor-pointer" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="cursor-pointer"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
