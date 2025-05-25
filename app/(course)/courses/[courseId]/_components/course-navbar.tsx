import { SessionProvider } from "next-auth/react";
import CourseNavbarRoutes from "./course-navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-[var(--sidebar)] shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />

      <SessionProvider>
        <CourseNavbarRoutes />
      </SessionProvider>
    </div>
  );
};

export default CourseNavbar;