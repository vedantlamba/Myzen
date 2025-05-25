"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { File, PlusCircle, X } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Attachment, Chapter } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { ClipLoader } from "react-spinners";
import {
  errorToast,
  SuccessToaster,
} from "@/components/providers/toast-providers";
import { attachmentFormSchema } from "@/schemas";

interface AttachmentFormProps {
  initialData: Chapter & { attachments: Attachment[] };
  courseId: string;
  chapterId: string;
}

export const ChapterAttachmentForm = ({
  initialData,
  courseId,
  chapterId,
}: AttachmentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof attachmentFormSchema>>({
    resolver: zodResolver(attachmentFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof attachmentFormSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/attachments`,
        values
      );
      SuccessToaster({ message: "Course Updated Successfully!" });
      toggleEdit();
      router.refresh();
    } catch {
      errorToast({ message: "Something went wrong." });
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/attachments/${id}`
      );
      SuccessToaster({ message: "Attachment deleted successfully!" });
      router.refresh();
    } catch {
      errorToast({ message: "Something went wrong deleting attachment!" });
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-accent rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Attachments
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
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {!initialData.attachments ||
            (initialData.attachments.length === 0 && (
              <p className="text-sm mt-2 text-neutral-400 italic">
                No attachments yet
              </p>
            ))}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 bg-neutral-100 border border-neutral-500 text-black rounded-md max-w-full"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="truncate break-all max-w-full overflow-hidden text-sm">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div className="h-full flex justify-center items-center px-3">
                      <ClipLoader size={15} />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <Button
                      onClick={() => onDelete(attachment.id)}
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <X />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
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
            Provide helpful materials to enhance the learning experience.
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
