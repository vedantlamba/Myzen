"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcCloseUpMode,
  FcBusinessman,
  FcSportsMode,
  FcPositiveDynamic,
  FcLike,
  FcMindMap,
  FcPortraitMode,
  FcGallery,
  FcMenu,
  FcMusic,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconsMap: Record<Category["name"], IconType> = {
  Business: FcBusinessman,
  "Technology & Development": FcEngineering,
  "Design & Creativity": FcCloseUpMode,
  "Lifestyle & Hobbies": FcLike,
  "Personal Development": FcPositiveDynamic,
  "Science & Engineering": FcMindMap,
  "Health & Fitness": FcSportsMode,
  Fashion: FcPortraitMode,
  Cooking: FcMenu,
  "Anime Drawing": FcGallery,
  Music: FcMusic,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <>
      <div className="overflow-x-auto custom-scrollbar w-full px-2">
        <div className="flex gap-4 p-4 min-w-max">
          {items.map((item) => (
            <CategoryItem
              key={item.id}
              label={item.name}
              icon={iconsMap[item.name]}
              value={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
