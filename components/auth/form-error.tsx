import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ErrorProps {
  message?: string;
}

const FormError = ({ message }: ErrorProps) => {
  if (!message) return null;
  return (
    <div>
      <div className="bg-[#B03052] p-3 rounded-md flex items-center gap-x-2 text-sm text-[#EBE8DB]">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default FormError;