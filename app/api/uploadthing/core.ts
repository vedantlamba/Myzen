import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new UploadThingError("Unauthorized");
  }

  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({
    video: { maxFileCount: 1, maxFileSize: "512GB" },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;