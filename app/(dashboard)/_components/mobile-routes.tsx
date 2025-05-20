"use client";

import { SessionProvider } from "next-auth/react";
import { UserBtn } from "./user-btn";
import { Profile } from "./profile";
import { TeacherBtn } from "./teacher-btn";

export const MobileRoutes = () => {
  return (
    <div className="w-[90%] md:w-[80%] mx-auto flex justify-between items-center">
      {/* On desktop: TeacherBtn left, others right. On mobile: all right. */}

      <SessionProvider>
        <div className="flex-1 hidden md:flex">
          <TeacherBtn />
        </div>

        <div className="flex-1 flex md:hidden justify-end">
          <TeacherBtn />
        </div>

        <div className="flex items-center gap-x-2">
          <UserBtn />
          <Profile />
        </div>
      </SessionProvider>
    </div>
  );
};
