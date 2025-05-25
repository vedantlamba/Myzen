"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex gap-x-2 w-full px-4 py-3 text-sm transition-all text-left hover:bg-neutral-100 cursor-pointer",
        isActive && "bg-neutral-100",
        isCompleted && "text-emerald-500 hover:text-emerald-600"
      )}
    >
      <div className="flex justify-center items-center">
        <Icon className="h-5 w-5 shrink-0" />
      </div>
      <span>{label}</span>
    </button>
  );
};