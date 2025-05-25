import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const courseId = (await params).courseId;
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 401 });
    }

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      course.isPublished ||
      !course.categoryId ||
      !hasPublishedChapter
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_PUBLISH_ERROR]", error);
    return new NextResponse("Internal Publishing Error", { status: 500 });
  }
}
