"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { PlusCircle, VideoIcon, X } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import {
  errorToast,
  SuccessToaster,
} from "@/components/providers/toast-providers";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(2, {
    message: "Video is required!",
  }),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl ?? "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      SuccessToaster({ message: "Chapter Updated Successfully!" });
      toggleEdit();
      router.refresh();
    } catch {
      errorToast({ message: "Something went wrong." });
    }
  };

  return (
    <div className="mt-6 border bg-accent rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
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
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <VideoIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center mt-4 justify-center h-60 bg-neutral-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-neutral-600" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {isClient && (
              <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
            )}
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
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
            Upload this chapter&apos;s video!
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          doesn&apos;s appear.
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
