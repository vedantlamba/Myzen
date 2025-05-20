import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LogOut, Settings, User, UserPen } from "lucide-react";

export const Profile = () => {
  return (
    <div className="hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="p-0">
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback>
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="px-6 py-6 text-center">
              <NavigationMenuLink
                href="/profile"
                className="flex flex-row justify-center items-center gap-2"
              >
                <UserPen /> Profile
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/settings"
                className="flex flex-row justify-center items-center gap-2"
              >
                <Settings /> Settings
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/logout"
                className="flex flex-row justify-center items-center gap-2"
              >
                <LogOut /> Logout
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
