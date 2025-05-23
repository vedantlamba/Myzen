"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  errorToast,
  SuccessToaster,
} from "@/components/providers/toast-providers";
import { priceFormSchema } from "@/schemas";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}


export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof priceFormSchema>>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      price: initialData.price ?? 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof priceFormSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      SuccessToaster({ message: "Course Updated Successfully!" });
      toggleEdit();
      router.refresh();
    } catch {
      errorToast({ message: "Something went wrong." });
    }
  };

  return (
    <div className="mt-6 border bg-accent rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button
          variant={"ghost"}
          size="icon"
          disabled={isSubmitting}
          className="cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing && (
            <>
              <X size={20} strokeWidth={2.25} absoluteStrokeWidth />
            </>
          )}

          {!isEditing && (
            <>
              <Pencil className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2 font-light",
            !initialData.price && "text-neutral-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No Price"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      step="0.01"
                      placeholder="Set a price for your course."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-3">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

{
  /* <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}></form>
</Form> */
}
