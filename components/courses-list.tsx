import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CourseList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 px-2 md:px-0">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            title={item.title}
            id={item.id}
            imageUrl={item.imageUrl!}
            chapLen={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item.category?.name ?? "Uncategorized"}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};