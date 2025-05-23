"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ImageIcon, PlusCircle, X } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { errorToast,SuccessToaster } from "@/components/providers/toast-providers";
import { imageFormSchema } from "@/schemas";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}



export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl ?? "",
    },
  });

  const { isSubmitting} = form.formState;

  const onSubmit = async (values: z.infer<typeof imageFormSchema>) => {
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
        Course Cover
        <Button
          variant={"ghost"}
          size="icon"
          disabled={isSubmitting}
          className="cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing && (
            <>
              <X />
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <ImageIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center mt-4 justify-center h-60 bg-neutral-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-neutral-600" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image alt="upload" fill src={initialData.imageUrl} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
            appearance={{
              container: "bg-slate-800 rounded-md p-6",
              label: "text-white font-semibold block mb-2",
              uploadIcon: "text-white",
              allowedContent: "text-yellow-300 text-sm",
              button:
                "bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 text-sm",
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

{
  /* <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}></form>
</Form> */
}