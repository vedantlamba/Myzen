"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize with current search param value
  const currentTitle = searchParams.get("title") || "";
  const currentCategoryId = searchParams.get("categoryId");

  const [value, setValue] = useState(currentTitle);
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    // Only update if the debounced value changed and it's different from current
    if (debouncedValue !== currentTitle) {
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            categoryId: currentCategoryId,
            title: debouncedValue || null,
          },
        },
        { skipNull: true, skipEmptyString: true }
      );
      router.push(url);
    }
  }, [debouncedValue, currentCategoryId, router, pathname, currentTitle]);

  return (
    <div className="flex items-center">
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[500px] rounded-full bg-neutral-200"
        placeholder="What are you curious about?"
      />
    </div>
  );
};