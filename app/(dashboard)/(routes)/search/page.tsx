export const dynamic = 'force-dynamic';
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@/auth";
import { CourseList } from "@/components/courses-list";
import { Suspense } from "react";
import { SearchInput } from "@/components/search-input";

interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...resolvedSearchParams,
  });

  return (
    <>
      <div className="w-full h-full">
        {/* Search Bar - only visible on mobile */}
        <div className="mx-auto md:flex md:justify-center md:items-center px-4 pt-4 mt-4">
          <Suspense fallback={<div className="h-10 w-full bg-gray-200 rounded animate-pulse" />}>
            <SearchInput />
          </Suspense>
        </div>

        {/* Page content (centered) */}
        <div className="w-full flex justify-center md:px-8 mt-4">
          <div className="w-full space-y-4">
            <Categories items={categories} />
            <CourseList items={courses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;