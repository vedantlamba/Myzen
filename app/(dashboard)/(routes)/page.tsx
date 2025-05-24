import { CourseMakers } from "../_components/course-makers";
import { HomePageBanner } from "../_components/home-page-banner";

const HomePage = async () => {
  return (
    <div className="flex justify-center items-center flex-col text-2xl md:text-lg">
      <HomePageBanner/>
      <CourseMakers/>
    </div>
  );
};

export default HomePage;
