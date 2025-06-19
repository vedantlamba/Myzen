"use client"
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-2 rounded border border-yellow-400 bg-yellow-50 p-4 text-yellow-800">
        <h3 className="text-lg font-semibold mb-2">
          Note about password reset
        </h3>
        <p>
          This LMS uses a simplified authentication flow and does not support
          full password reset functionality here. If you want to explore a
          complete authentication system including password changes, please
          check out my{" "}
          <a
            href="https://github.com/vedantlamba/Volkov-authentication"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black"
          >
            NextAuth project
          </a>
          .
        </p>
      </div>

      <div className="pointer-events-none opacity-50">
        <ResetPasswordForm />
      </div>
      <div className="flex justify-center items-center py-6">
        <Button variant="link" className="cursor-pointer" onClick={handleClick}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
