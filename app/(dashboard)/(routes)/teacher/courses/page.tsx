import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Link href="/teacher/create">
        <Button className="cursor-pointer">
          <Plus />
          New Course
        </Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
