"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

export const UserBtn = ({ greeting }: { greeting?: string }) => {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="flex justify-center items-center h-full px-3 text-center min-w-[150px] max-w-[250px] truncate">
        {!session ? (
          <Link href="/auth/login">
            {status === "loading" ? (
              <div className="w-full flex justify-center items-center">
                <ClipLoader size={20} />
              </div>
            ) : (
              <Button className="text-[13px] md:text-[15px] cursor-pointer">
                Sign In
              </Button>
            )}
          </Link>
        ) : (
          <span className="text-[13px] md:text-[15px] font-medium truncate">
            {greeting}
            {session.user?.name}
          </span>
        )}
      </div>
    </div>
  );
};
