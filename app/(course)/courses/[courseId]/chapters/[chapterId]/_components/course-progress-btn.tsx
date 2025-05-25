"use client";

import {
  errorToast,
  SuccessToaster,
} from "@/components/providers/toast-providers";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseProgressBtnProps {
  chapterId: string;
  courseId: string;
  isCompleted: boolean;
  nextChapterId?: string | null;
}

export const CourseProgressBtn = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressBtnProps) => {
  const confetti = useConfetti();
  const router = useRouter();
  const Icon = isCompleted ? XCircle : CheckCircle;
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      SuccessToaster({ message: "Progress updated successfully" });
      router.refresh();
    } catch (err) {
      console.log("CourseProgressBtn error", err);
      errorToast({ message: "cannot update progress" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant={!isCompleted ? "custom" : "outline"}
        type="button"
        disabled={isLoading}
        onClick={onClick}
        // disabled={isLoading}
        className="w-full md:w-auto mt-2 cursor-pointer"
      >
        {isCompleted ? "Not Completed" : "Mark as Completed"}
        <Icon />
      </Button>
    </div>
  );
};
