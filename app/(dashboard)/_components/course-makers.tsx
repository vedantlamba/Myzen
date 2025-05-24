import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const personImages = [
  {
    image: "/per-15.jpeg",
    name: "Lorenzo Bellini",
    course: "The Art of Scent Creation",
    category: "Perfumery",
  },
  {
    image: "/per-14.jpeg",
    name: "Élodie Marceau",
    course: "Parisian Fashion & Style",
    category: "Fashion",
  },
  {
    image: "/per-13.jpeg",
    name: "Liang Wei",
    course: "Mastering Traditional Chinese Instruments",
    category: "Music",
  },
  {
    image: "/per-11.jpeg",
    name: "James Carter",
    course: "Business Strategy & Leadership",
    category: "Business",
  },
  {
    image: "/per-8.jpeg",
    name: "Takeshi Yamamoto",
    course: "Martial Arts: The Way of the Warrior",
    category: "Martial Arts",
  },
  {
    image: "/per-5.jpeg",
    name: "Matteo Romano",
    course: "Italian Cooking: Soul of the Kitchen",
    category: "Culinary",
  },
];

export const CourseMakers = () => {
  const desiredSize = 450; // Define the desired width and height

  return (
    <div className="w-full md:mt-32 mt-10 flex flex-col gap-y-8 pb-10">
      <div className="max-w-5xl  mx-auto">
        <h1 className="text-sm md:text-xl lg:text-4xl text-center font-light">
          A spark of learning, right when you need it.
        </h1>
      </div>
      <div className="h-auto relative">
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
                    {/* Image */}
                    <Image
                      src={person.image}
                      alt={`person ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="md:rounded-md"
                    />

                    {/* Gradient + Text */}
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
      </div>
    </div>
  );
};
