import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackBtn } from "@/components/auth/back-btn";
import { Header } from "./header";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackBtn label="Back To Login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};