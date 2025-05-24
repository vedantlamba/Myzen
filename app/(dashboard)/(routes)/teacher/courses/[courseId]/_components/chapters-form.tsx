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
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
// import { ChapterList } from "./chapters-list";
import { ClipLoader } from "react-spinners";
import { errorToast,SuccessToaster } from "@/components/providers/toast-providers";
import { ChaptersFormSchema } from "@/schemas";
import { ChapterList } from "./chapters-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}



export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm<z.infer<typeof ChaptersFormSchema>>({
    resolver: zodResolver(ChaptersFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof ChaptersFormSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      SuccessToaster({ message: "Chapter Created!" });
      toggleCreating();
      router.refresh();
    } catch {
      errorToast({ message: "Something went wrong creating chapters!" });
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      SuccessToaster({ message: "Chapters Reordered!" });
      router.refresh();
    } catch {
      errorToast({
        message: "Something went wrong while changing chapter positions!",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-accent rounded-md p-4">
      {isUpdating && (
        <div className="absolute right-0 top-0 w-full h-full flex justify-center items-center bg-neutral-300/40 rounded-md transition">
          <ClipLoader size={20} color="#000000" />
        </div>
      )}

      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button
          variant={"ghost"}
          size="icon"
          disabled={isSubmitting}
          className="cursor-pointer"
          onClick={toggleCreating}
        >
          {isCreating && (
            <>
              <X size={20} strokeWidth={2.25} absoluteStrokeWidth />
            </>
          )}

          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. introduction to the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && " text-neutral-400 italic"
          )}
        >
          {!initialData.chapters.length && "No Chapters"}
          <ChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag or drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

{
  /* <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}></form>
</Form> */
}