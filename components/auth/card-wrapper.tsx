import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackBtn } from "./back-btn";
import { Header } from "./header";
import {Social} from "./social";
interface CardWrapperProps {
  children: React.ReactNode;
  header: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial: boolean;
}

const CardWrapper = ({
  children,
  backBtnLabel,
  header,
  showSocial,
  backBtnHref,
}: CardWrapperProps) => {
  return (
    <Card className="md:w-[380px] w-[340px]">
      <CardHeader>
        <Header label={header} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn  label={backBtnLabel} href={backBtnHref}/>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;