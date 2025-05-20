"use client";

import { SessionProvider } from "next-auth/react";
import { UserBtn } from "./user-btn";
import { Profile } from "./profile";
import { TeacherBtn } from "./teacher-btn";

export const MobileRoutes = () => {
  return (
    <div className="px-4 md:px-0 w-full md:w-[80%] mx-auto flex justify-end md:justify-center items-center">
      {/* On desktop: TeacherBtn left, others right. On mobile: all right. */}

      <SessionProvider>
        <div className="flex-1 hidden md:flex">
          <TeacherBtn />
        </div>

        <div className="flex-1 flex md:hidden justify-end">
          <TeacherBtn />
        </div>

        <div className="hidden md:flex">
          <UserBtn />
        </div>

        <div className="flex items-center gap-x-2">
          <Profile />
        </div>
      </SessionProvider>
    </div>
  );
};
