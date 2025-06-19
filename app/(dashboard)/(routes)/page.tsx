import { StickyBanner } from "@/components/ui/sticky-banner";
import { ComingSoon } from "../_components/comint-soon";
import { CourseMakers } from "../_components/course-makers";
import { HomePageBanner } from "../_components/home-page-banner";

const HomePage = async () => {
  return (
    <>
    
      <div className="relative flex justify-center items-center flex-col text-2xl md:text-lg">
        <div className="hidden md:block absolute top-0 left-0 w-full">
          <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
            <p className="mx-0 max-w-[90%] text-sm md:text-lg text-white drop-shadow-md">
              Learn Fearlessly. Build Relentlessly.{" "}
              <a
                href="/search"
                className="transition duration-200 hover:underline"
              >
                Only on Myzen.
              </a>
            </p>
          </StickyBanner>
        </div>
        <HomePageBanner />
        <CourseMakers />
        <ComingSoon />
      </div>
    </>
  );
};

export default HomePage;
