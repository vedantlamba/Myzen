import { CircleCheck } from "lucide-react";

interface SuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: SuccessProps) => {
  if (!message) return null;
  return (
    <div>
      <div>
        <div className="bg-[#86A788] p-3 rounded-md flex items-center gap-x-2 text-sm text-white">
          <CircleCheck className="h-4 w-4" />
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default FormSuccess;