import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const HomePageBanner = () => {
  return (
    <div className="max-w-5xl mx-auto relative pb-16">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/home-banner.jpeg"
              alt="Homepage1"
              width={1024}
              height={576}
              className="w-full h-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/home-banner-4.jpeg"
              alt="Homepage1"
              width={1024}
              height={576}
              className="w-full h-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/home-banner-3.jpeg"
              alt="Homepage1"
              width={1024}
              height={576}
              className="w-full h-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/home-banner-2.jpeg"
              alt="Homepage1"
              width={1024}
              height={576}
              className="w-full h-auto"
            />
          </CarouselItem>
        </CarouselContent>

        <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 flex gap-4">
          <CarouselPrevious className="bg-black hover:bg-white text-white w-10 h-10 cursor-pointer" />
          <CarouselNext className="bg-black hover:bg-white text-white w-10 h-10 cursor-pointer" />
        </div>
      </Carousel>
    </div>
  );
};
 