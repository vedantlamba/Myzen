import { Button } from "@/components/ui/button";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const personImages = [
  {
    src: "/per-15.jpeg",
    name: "Lorenzo Bellini",
    title: "The Art of Scent Creation",
    category: "Perfumery",
  },
  {
    src: "/per-14.jpeg",
    name: "Élodie Marceau",
    title: "Parisian Fashion & Style",
    category: "Fashion",
  },
  {
    src: "/per-13.jpeg",
    name: "Liang Wei",
    title: "Mastering Traditional Chinese Instruments",
    category: "Music",
  },
  {
    src: "/per-11.jpeg",
    name: "James Carter",
    title: "Business Strategy & Leadership",
    category: "Business",
  },
  {
    src: "/per-8.jpeg",
    name: "Takeshi Yamamoto",
    title: "Martial Arts: The Way of the Warrior",
    category: "Martial Arts",
  },
  {
    src: "/per-5.jpeg",
    name: "Matteo Romano",
    title: "Italian Cooking: Soul of the Kitchen",
    category: "Culinary",
  },
];

export const CourseMakers = () => {
  // const desiredSize = 450;
  const cards = personImages.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full md:mt-32 mt-10 flex flex-col gap-y-8 pb-10">
      <div className="max-w-5xl  mx-auto">
        <h1 className="text-sm md:text-xl lg:text-4xl text-center font-light md:font-bold">
          A spark of learning, right when you need it.
        </h1>
      </div>
      <div className="w-full px-3 overflow-y-hidden">
        <Carousel items={cards} />
      </div>
      {/* <div className="h-auto relative">
        <div className="max-w-7xl mx-auto">
          <Carousel>
            <CarouselContent>
              {personImages.map((person, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/1 md:basis-1/3 flex justify-center"
                >
                  <div
                    style={{
                      width: desiredSize,
                      height: desiredSize,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    className="md:rounded-md"
                  >

                    <Image
                      src={person.image}
                      alt={`person ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="md:rounded-md"
                    />


                    <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end items-center text-white p-4">
                      <h2 className="text-lg font-semibold">{person.name}</h2>
                      <p className="text-sm opacity-90">{person.course}</p>
                      <span className="text-xs opacity-70 italic">
                        Category – {person.category}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 flex gap-4">
              <CarouselPrevious className="bg-black hover:bg-white text-white  w-10 h-10 cursor-pointer" />
              <CarouselNext className="bg-black hover:bg-white text-white  w-10 h-10 cursor-pointer" />
            </div>
          </Carousel>
        </div>
      </div> */}
      {/* <div className="flex justify-center items-center">
        <Link href="/search">
          <Button variant="browse" className="px-6 cursor-pointer">
            Browse Our Courses
          </Button>
        </Link>
      </div> */}
    </div>
  );
};
