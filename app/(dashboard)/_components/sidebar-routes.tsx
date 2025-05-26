"use client";

import { BarChart, Compass, Home, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const GuestRoutes = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const TeacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

interface SidebarRoutesProps {
  onRouteClick?: () => void;
}

export const SidebarRoutes = ({ onRouteClick }: SidebarRoutesProps) => {
  const pathname = usePathname();
  const routes = pathname.includes("/teacher") ? TeacherRoutes : GuestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          href={route.href}
          label={route.label}
          onRouteClick={onRouteClick}
        />
      ))}
    </div>
  );
};
