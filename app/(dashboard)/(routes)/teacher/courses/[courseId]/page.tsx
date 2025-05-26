import { auth } from "@/auth";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import {
  BookOpenCheck,
  CircleDollarSign,
  LayoutDashboard,
  MonitorPlay,
} from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/titile-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { ChaptersForm } from "./_components/chapters-form";
import { CourseActions } from "./_components/course-actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AuthorForm } from "./_components/author-form";

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const courseId = (await params).courseId;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
        // attachments: {
        //   orderBy: {
        //     createdBy: "desc"
        //   }
        // }
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.author,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <div>
      <div className="p-6 w-full h-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
              Let&apos;s Build Your Course
            </h1>
            <span className="text-sm text-start md:text-base text-muted-foreground">
              Complete all required fields {completionText}
            </span>
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <CourseActions
                disabled={!isComplete}
                courseId={courseId}
                isPublished={course.isPublished}
              />
              {!course.isPublished ? (
                <p className="text-red-500 text-[10px] md:px-4 md:text-sm">
                  This course is currently unpublished
                </p>
              ) : (
                <div>
                  <Badge className="bg-emerald-500 text-white px-4">Live</Badge>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start lg:flex-row gap-6 mt-6">
          <div className="flex-1 w-full flex flex-col space-x-6 max-w-7xl">
            <div className="flex items-center text-start md:justify-start">
              <IconBadge icon={LayoutDashboard} />
              <h1 className="text-lg font-medium">Customize your course</h1>
            </div>

            {/* Two-column layout for forms with independent height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="flex flex-col gap-4 ">
                <TitleForm initialData={course} courseId={course.id} />
                <DescriptionForm initialData={course} courseId={course.id} />
              </div>
              <div className="flex flex-col gap-4 h-full">
                <ImageForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[300px] space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-lg font-medium">Sell Your Course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-lg font-medium">Course Category</h2>
              </div>
              <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
              <AuthorForm initialData={course} courseId={course.id} />
            </div>
          </div>
          <div></div>
        </div>
        <div className="space-y-6 max-w-7xl">
          <div className="flex items-center gap-x-2 md:pt-6">
            <IconBadge icon={MonitorPlay} />
            <h2 className="text-lg font-medium">Course Chapters</h2>
          </div>
          <ChaptersForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
