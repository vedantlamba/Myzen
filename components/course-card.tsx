"use client";

import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapLen: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  title,
  id,
  imageUrl,
  chapLen,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt="title" src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-card-foreground transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs py-2 text-accent-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex flex-1 items-center gap-x-1 text-neutral-400">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chapLen} {chapLen === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
            <div className="flex-1 text-end">
              {progress !== null ? (
                <div className="text-center">
                  <CourseProgress
                    size="sm"
                    value={progress}
                    variant={progress === 100 ? "success" : "default"}
                  />
                </div>
              ) : (
                <p className="font-semibold text-lg text-neutral-600">
                  {formatPrice(price)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};