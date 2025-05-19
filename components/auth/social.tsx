"use client";
// import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
// import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export function Social() {
  // const onClick = (provider: "google" | "github") => {
  //   signIn(provider, {
  //     callbackUrl: DEFAULT_LOGIN_REDIRECT,
  //   });
  // };

  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-1/2 cursor-pointer"
        // onClick={() => onClick("google")}
      >
        <FaGoogle className="text-[var(--darker)]" />
      </Button>
      <Button
        size="lg"
        className="w-1/2 cursor-pointer"
        variant="outline"
        // onClick={() => onClick("github")}
      >
        <FaGithub className="text-[var(--darker)]" />
      </Button>
    </div>
  );
}