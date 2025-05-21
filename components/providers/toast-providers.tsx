"use client";

// import { AlertCircle, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return <Toaster />;
};

export const SuccessToaster = ({
  message = "Success. Your action was completed.",
}: {
  message?: string;
} = {}) => {
  return toast.success(message, {
    style: {
      background: "#f5fdfb",
      border: "1px solid #d1fae5",
      color: "#064e3b",
      fontSize: "14px",
      padding: "10px 16px",
      borderRadius: "8px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#f5fdfb",
    },
  });
};

export const errorToast = ({
  message = "Error. Please try again.",
}: {
  message?: string;
} = {}) => {
  return toast.error(message, {
    duration: 1000,
    style: {
      background: "#EEEEEE",
      border: "1px solid #DEDEDE",
      color: "#C10000",
      fontSize: "14px",
      padding: "10px 16px",
      borderRadius: "8px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#FF4949",
      secondary: "#EEEEEE",
    },
  });
};