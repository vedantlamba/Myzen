import { MobileRoutes } from "./mobile-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="p-3 border-b h-full flex items-center bg-white  shadow-sm">
      <MobileSidebar />
      <MobileRoutes />
    </div>
  );
};
