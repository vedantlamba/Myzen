import { SessionProvider } from "next-auth/react";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { UserBtn } from "./user-btn";

interface SidebarProps {
  onRouteClick?: () => void;
}

export const Sidebar = ({ onRouteClick }: SidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes onRouteClick={onRouteClick} />
      </div>
      <div className="md:hidden py-28 flex justify-center items-center">
        <SessionProvider>
          <UserBtn greeting="Hello, " />
        </SessionProvider>
      </div>
    </div>
  );
};
