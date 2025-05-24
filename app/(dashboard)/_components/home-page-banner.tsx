import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export const HomePageBanner = () => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-y-28 h-auto relative bg-black">
      <div className="md:max-w-3xl flex-1">
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
            <CarouselPrevious className="bg-black hover:bg-white text-white  w-10 h-10 cursor-pointer" />
            <CarouselNext className="bg-black hover:bg-white text-white  w-10 h-10 cursor-pointer" />
          </div>
        </Carousel>
      </div>
      <div className="flex-1 bg-black pt-5 pb-11 px-5 md:px-0 md:py-0">
        <div className="flex flex-col gap-y-2 max-w-2xl h-full justify-center mx-auto p-3">
          <h1 className="text-2xl md:text-xl lg:text-3xl font-bold tracking-tight text-white">
            Welcome to Myzen
          </h1>
          <span className="text-sm text-start md:text-sm lg:text-base text-neutral-200 font-light">
            Learn. Create. Master. Your journey through knowledge begins here.
          </span>

          {/* Optional status message or note */}
          <p className="text-neutral-300 text-[10px] md:text-xs lg:text-sm ">
            Explore our curated courses and start learning at your own pace.
          </p>
          <div className="flex items-end justify-end md:justify-start pt-2 md:pt-1">
            <Link href="/search">
              <Button variant="browse" className="cursor-pointer px-8">Browse</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
