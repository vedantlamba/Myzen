import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const courseId = (await params).courseId;
    const { list } = await req.json();
    const session = await auth();
    const userId = session?.user?.id;
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

    for (const item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[Reorder_Error]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
