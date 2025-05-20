"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const SidebarItem = ({ icon: Icon, href, label }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <Button
      onClick={onClick}
      type="button"
      variant="ghost"
      className={cn(
        "text-sm md:text-lg flex items-center gap-x-2 pl-6 py-6 cursor-pointer rounded-none ",
        isActive && "bg-accent"
      )}
    >
      <div className={cn("flex w-full items-center gap-x-2 py-4 font-light",isActive && "font-medium")}>
        <Icon
          size={22}
        />
        {label}
      </div>
    </Button>
  );
};
