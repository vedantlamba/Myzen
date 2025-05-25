"use client";

import { errorToast } from "@/components/providers/toast-providers";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";

interface CourseEnrollProps {
  courseId: string;
  price: number;
}

export const CourseEnrollBtn = ({ courseId, price }: CourseEnrollProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      errorToast();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full md:w-auto mt-2 cursor-pointer"
    >
      Enroll For {formatPrice(price)}
    </Button>
  );
};