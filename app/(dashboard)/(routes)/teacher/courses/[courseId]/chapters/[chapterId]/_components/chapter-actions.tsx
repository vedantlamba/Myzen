"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import {
  errorToast,
  SuccessToaster,
} from "@/components/providers/toast-providers";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ChapterActionProps {
  courseId: string;
  chapterId: string;
  disabled: boolean;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        SuccessToaster({ message: "Chapter Unpublished!" });
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        SuccessToaster({ message: "Chapter published!" });
      }

      router.refresh();
    } catch {
      errorToast({ message: "Something went wrong in publishing!" });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      SuccessToaster({ message: "Chapter Deleted!" });
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      errorToast();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled || isLoading}
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="outline" size="sm" disabled={isLoading}>
          <Trash />
        </Button>
      </ConfirmModal>
    </div>
  );
};
