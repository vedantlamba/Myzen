"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import {
  errorToast,
  SuccessToaster,
} from "@/components/providers/toast-providers";

import { Button } from "@/components/ui/button";
// import { useConfetti } from "@/hooks/use-confetti";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseActionProps {
  courseId: string;
  disabled: boolean;
  isPublished: boolean;
}

export const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const confetti = useConfetti();

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        SuccessToaster({ message: "Course Unpublished!" });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        SuccessToaster({ message: "Course published!" });
        // confetti.onOpen();
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
      await axios.delete(`/api/courses/${courseId}`);
      SuccessToaster({ message: "Course Deleted!" });
      router.refresh();
      router.push(`/teacher/create`);
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
