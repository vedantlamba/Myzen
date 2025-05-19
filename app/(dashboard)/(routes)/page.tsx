import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="border flex justify-center items-center flex-col text-2xl md:text-2xl">
      Myzen – Learn. Grow. Evolve. Welcome to Myzen, a next-generation Learning
      Management System built to empower learners and educators alike. Whether
      you're a student looking to sharpen your skills or an instructor ready to
      share your knowledge, Myzen gives you the tools to succeed in the modern
      learning era.
      <Link href="/settings">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
};

export default HomePage;
