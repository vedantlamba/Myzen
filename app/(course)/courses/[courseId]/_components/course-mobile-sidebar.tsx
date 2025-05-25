import { Menu } from "lucide-react";
import { Course, Chapter, UserProgress } from "@prisma/client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <CourseSidebar course={course} progressCount={progressCount} />
        <SheetTitle className="p-4 font-light hidden"></SheetTitle>
      </SheetContent>
    </Sheet>
  );
};