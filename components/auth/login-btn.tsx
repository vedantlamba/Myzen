"use client";
import { useRouter } from "next/navigation";
interface LoginBtnProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginBtn = ({
  children,
  mode = "redirect",
}: LoginBtnProps) => {
  const router = useRouter();
  const onClick = () => {
    console.log("Login Button Click");
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>Volkov - Vedant</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};