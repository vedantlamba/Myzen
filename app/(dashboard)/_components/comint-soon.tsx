"use client"; // Add this at the top of ComingSoon.tsx
import { ColourfulText } from "@/components/ui/colourful-text";
// import Image from "next/image";

export const ComingSoon = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-black relative z-2 font-sans">
          Coming
          <ColourfulText text="Soon" />
        </h1>
      </div>
      <div className="max-w-7xl w-full my-10 md:my-28 overflow-hidden">
        <div className="min-h-[300px] md:h-[500px]">
          <div className="h-full grid grid-cols-1 md:grid-cols-[1fr_3fr] md:gap-0">
            <div className="relative h-[300px] md:h-full overflow-hidden md:rounded-r-none md:rounded-l-md">
              <img
                src="/cs-per-1.jpeg"
                alt="image1"
                className="absolute h-full w-full object-cover"
              />
              <div className="absolute p-3 top-0 left-0 pointer-events-none  inset-x-0  z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent">
                <p className="text-left font-sans text-xs uppercase tracking-wide text-gray-200 md:text-sm">
                  Dimitri Volkov
                </p>
                <p className="text-left font-sans text-sm font-medium text-white md:text-base">
                  Ethical Hacking
                </p>
                <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
                  Unlocking the Digital Fortress
                </p>
              </div>
            </div>

            <div className="relative h-[300px] md:h-full overflow-hidden md:rounded-l-none md:rounded-r-md">
              <img
                src="/cs-2.jpeg"
                alt="image2"
                className="absolute h-full w-full object-cover"
              />
              <div className="absolute p-3 top-0 left-0 pointer-events-none  inset-x-0  z-30 h-full bg-gradient-to-b from-black/80 via-transparent to-transparent">
                <p className="mt-2 flex justify-center items-center font-sans text-sm font-semibold [text-wrap:balance] text-white md:text-3xl text-center">
                  Ethical Hacking 101: <br /> Exploring the World of
                  Cybersecurity
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[300px] md:h-[500px]">
          <div className="h-full grid grid-cols-1 md:grid-cols-[3fr_1fr] md:gap-0">
            <div className="relative h-[300px] md:h-full overflow-hidden md:rounded-t-none md:rounded-l-md">
              <img
                src="/cs-1.jpeg"
                alt="image2"
                className="absolute h-full w-full object-cover"
              />
              <div className="absolute p-3 top-0 left-0 pointer-events-none  inset-x-0  z-30 h-full bg-gradient-to-b from-black/80 via-transparent to-transparent">
                <p className="mt-2 flex justify-center items-center font-sans text-sm font-semibold [text-wrap:balance] text-white md:text-3xl text-center">
                  Building Blocks of Story: <br /> A Comprehensive Fiction Workshop
                </p>
              </div>
            </div>
            <div className="relative h-[300px] md:h-full overflow-hidden md:rounded-l-none md:rounded-r-md">
              <img
                src="/cs-per-2.jpeg"
                alt="image1"
                className="absolute h-full w-full object-cover"
              />
              <div className="absolute p-3 top-0 left-0 pointer-events-none  inset-x-0  z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent">
                <p className="text-left font-sans text-xs uppercase tracking-wide text-gray-200 md:text-sm">
                  Natalia Kowalska
                </p>
                <p className="text-left font-sans text-sm font-medium text-white md:text-base">
                  Fictional Writing
                </p>
                <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
                  The Alchemy of Storytelling Sources
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
