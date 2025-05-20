"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";

export const TeacherBtn = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isTeacher = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/courses");
  return (
    <div className="flex w-full justify-end md:w-auto">
      {isTeacher || isPlayerPage ? (
        <Link href="/">
          <Button className="cursor-pointer">
            <LogOut />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <div className={``}>
            <Button
              className="cursor-pointer"
              disabled={status === "loading" || !session}
            >
              Educator ?
            </Button>
          </div>
        </Link>
      )}
    </div>
  );
};
