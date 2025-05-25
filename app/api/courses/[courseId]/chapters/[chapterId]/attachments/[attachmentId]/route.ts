import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      chapterId: string;
      attachmentId: string;
      courseId: string;
    }>;
  }
) {
  try {
    const chapterId = (await params).chapterId;
    const attachmendId = (await params).attachmentId;
    const courseId = (await params).courseId;
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        chapterId,
        id: attachmendId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
