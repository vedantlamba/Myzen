"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { twMerge } from "tailwind-merge";
import { errorToast } from "./providers/toast-providers";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  appearance?: {
    container?: string;
    uploadIcon?: string;
    label?: string;
    allowedContent?: string;
    button?: string;
  };
}

export const FileUpload = ({
  onChange,
  endpoint,
  appearance,
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        errorToast({ message: error.message });
      }}
      className={twMerge(
        appearance?.container,
        "bg-stone-100 border-stone-300 p-5 rounded-xl border-2 border-dashed shadow-sm hover:shadow-md transition"
      )}
      appearance={{
        uploadIcon: twMerge(
          appearance?.uploadIcon,
          "w-10 h-10 text-stone-600"
        ),
        label: twMerge(
          appearance?.label,
          "text-stone-700 text-sm font-medium"
        ),
        allowedContent: twMerge(
          appearance?.allowedContent,
          "text-stone-500 text-xs"
        ),
        button: twMerge(
          appearance?.button,
          "mt-2 bg-black hover:bg-stone-300 px-4 py-1.5 rounded-md text-sm font-semibold"
        ),
        container: appearance?.container,
      }}
    />
  );
};
