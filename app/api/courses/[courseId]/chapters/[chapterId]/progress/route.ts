import { auth } from "@/auth";
import { db } from "@/lib/db";
// import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { chapterId } = await params;
    const session = await auth();
    const userId = await session?.user?.id;
    const { isCompleted } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProgress = await db.userProgress.upsert({
      where: {
        chapterId_userId: {
          chapterId: chapterId,
          userId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[Chapter_id_progress_error:]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "success" });
}
