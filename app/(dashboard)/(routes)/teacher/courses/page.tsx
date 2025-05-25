import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cat } from "react-kawaii";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Nanum_Pen_Script } from "next/font/google";
// import { Noto_Sans_JP } from "next/font/google";

// const notoJP = Noto_Sans_JP({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   display: "swap",
// });

const NanumPen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const CoursesPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col justify-start h-full mx-auto items-center max-w-7xl w-full">
      <div className="relative">
        <Cat size={240} mood="blissful" color="#FFFDF6" />
        <div className="absolute top-1/2 left-[80%] -translate-y-1/2 mt-5">
          <p className={`${NanumPen.className}`}>
            Hello There!
          </p>
        </div>
      </div>

      <Link href="/teacher/create">
        <Button className="cursor-pointer">New Course</Button>
      </Link>
      <div className="w-full">
        <div className="mx-auto overflow-x-auto py-10 px-2 sm:px-4 md:px-6 text-start">
          <DataTable columns={columns} data={courses} />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
