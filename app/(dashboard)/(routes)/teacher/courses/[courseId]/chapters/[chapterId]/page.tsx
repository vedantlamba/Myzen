import { auth } from "@/auth";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  const courseId = await (await params).courseId;
  const chapterId = await (await params).chapterId;
  if (!userId) {
    redirect("/");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) {
    return redirect("/");
  }

  const requireFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requireFields.every(Boolean);

  return (
    <>
      <div className="p-6 w-full h-full overflow-auto">
        <div className="flex">
          <div>
            <Link
              href={`/teacher/courses/${courseId}`}
              className="flex items-center pb-3 text-sm text-start md:text-base text-muted-foreground hover:opacity-75 transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
                  Chapter Creation
                </h1>
                <span className="text-sm text-start md:text-base text-muted-foreground">
                  Complete all fields {completionText}
                </span>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  {/* <ChapterActions
                    disabled={!isComplete}
                    courseId={courseId}
                    chapterId={chapterId}
                    isPublished={chapter.isPublished}
                  /> */}
                  <p className="text-red-500 text-[10px] md:px-4 md:text-sm">
                    {!chapter.isPublished
                      ? "This chapter is currently unpublished"
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-7">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-lg font-medium">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
              {/* <ChapterDescriptionForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              /> */}
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-lg font-medium">Access Settings</h2>
              </div>
              {/* <ChapterAccessForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              /> */}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-lg font-medium">Add a video</h2>
            </div>
            {/* <ChapterVideoForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            /> */}
          </div>
        </div>
      </div>
    </>
  );

  return <div>Chapter Id Page</div>;
};

export default ChapterIdPage;
