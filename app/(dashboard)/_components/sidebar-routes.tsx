"use client";

import { Compass, Home } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

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

export const SidebarRoutes = () => {
  const routes = GuestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
};
