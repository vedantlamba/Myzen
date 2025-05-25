import { auth } from "@/auth";
import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const chapterId = (await params).chapterId;
    const courseId = (await params).courseId;
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
      const deletedChapter = await db.chapter.delete({
        where: {
          id: chapterId,
        },
      });

      const publishedChapterInCourse = await db.chapter.findMany({
        where: {
          courseId: courseId,
          isPublished: true,
        },
      });

      if (!publishedChapterInCourse.length) {
        await db.course.update({
          where: {
            id: courseId,
          },
          data: {
            isPublished: false,
          },
        });
      }

      return NextResponse.json(deletedChapter);
    }
  } catch (error) {
    console.log("CHAPTER_DELETE_ERROR:", error);
    return new NextResponse("Chapter Deletion Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const courseId = (await params).courseId;
    const chapterId = (await params).chapterId;
    const session = await auth();
    const userId = session?.user?.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isPublished, ...values } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...values,
      },
    });

    //MUX

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await mux.video.assets.create({
        inputs: [
          {
            url: values.videoUrl,
          },
        ],
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[ChaptersID_Error]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
