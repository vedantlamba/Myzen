import Link from "next/link";
import { Button } from "../ui/button";

interface backbuttonprops {
  label: string;
  href: string;
}

export function BackBtn({ label, href }: backbuttonprops) {
  return (
    <Button className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}