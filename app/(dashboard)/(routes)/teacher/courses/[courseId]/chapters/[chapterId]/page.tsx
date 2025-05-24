import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/");
  }
  const chapter = db.chapter.findUnique
  return <div>Chapter Id Page</div>;
};

export default ChapterIdPage;
