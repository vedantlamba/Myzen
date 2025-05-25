import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import qs from "query-string";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  icon?: IconType;
  value?: string;
}

export const CategoryItem = ({
  label,
  icon: Icon,
  value,
}: CategoryItemProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <Button
    onClick={onClick}
      variant={isSelected ? "default" : "ghost"}
      className={cn("text-center flex gap-2 p-2 md:p-4 cursor-pointer border rounded-full")}
    >
      {Icon && <Icon size={20} />}
      <div className="text-[8px] lg:text-[15px] truncate whitespace-normal text-center flex justify-center items-center">
        {label}
      </div>
    </Button>
  );
};