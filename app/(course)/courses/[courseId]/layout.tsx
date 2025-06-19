import { getProgress } from "@/actions/get-progress";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebar from "./_components/course-sidebar";




const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) => {
  const courseId = (await params).courseId;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findFirst({
    where: {
      id: courseId,
      OR: [
        { userId }, 
        { isPublished: true }, 
      ],
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="min-h-[100vh] flex">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden fixed md:flex h-full w-80 flex-col shadow-sm">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="flex-1 md:pl-80 pt-[80px]">{children}</main>
    </div>
  );
};

export default CourseLayout;
