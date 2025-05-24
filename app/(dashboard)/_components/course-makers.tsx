import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const personImages = [
  "/per-1.jpeg",
  "/per-2.jpeg",
  "/per-3.jpeg",
  "/per-4.jpeg",
  "/per-5.jpeg",
];

export const CourseMakers = () => {
  const desiredSize = 450; // Define the desired width and height

  return (
    <div className="relative w-full  md:mt-32 mt-10 flex flex-col gap-y-8 pb-10 overflow-y-hidden">
      <div className="max-w-5xl  mx-auto">
        <h1 className="text-sm md:text-xl lg:text-4xl text-center font-semibold">
          A spark of learning, <br /> right when you need it.
        </h1>
      </div>
      <div className="max-w-5xl mx-auto">
        <Carousel>
          <CarouselContent>
            {personImages.map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 md:basis-1/3 flex justify-center"
              >
                <div
                  style={{
                    width: desiredSize,
                    height: desiredSize,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={src}
                    alt={`person ${index}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
