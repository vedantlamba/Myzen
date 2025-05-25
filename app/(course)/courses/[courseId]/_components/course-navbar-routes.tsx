"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User, UserPen } from "lucide-react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";

const CourseNavbarRoutes = () => {
  const pathName = usePathname();
  // const router = useRouter();

  const { data: session, status } = useSession();

  console.log(`Session this is : `, session?.user?.name);

  const isTeacher = pathName?.startsWith("/teacher");
  const isPlayerPage = pathName?.includes("/courses");
  const isSearchPage = pathName === "/search";

  // if (status === "loading") {
  //   return (
  //     <Button className="cursor-pointer" disabled>
  //       Educator ?
  //     </Button>
  //   );
  // }

  return (
    <>
      <div className="flex w-[90%] md:w-[80%] mx-auto gap-x-1 md:gap-x-0">
        <div className="flex w-full justify-end md:w-auto">
          {isTeacher || isPlayerPage ? (
            <Link href="/">
              <Button className="cursor-pointer">
                <LogOut />
                Exit
              </Button>
            </Link>
          ) : (
            <Link href="/teacher/courses">
              <div className={``}>
                <Button
                  className="cursor-pointer"
                  disabled={status === "loading" || !session}
                >
                  Educator ?
                </Button>
              </div>
            </Link>
          )}
        </div>

        {isSearchPage && (
          <div className="hidden w-full lg:flex justify-center items-center">
            <SearchInput />
          </div>
        )}

        <div className="flex flex-row gap-x-2 ml-auto">
          {!session ? (
            <div>
              <Link href="/auth/login">
                {status === "loading" ? (
                  <div className="flex justify-center items-center h-full w-full px-4">
                    <ClipLoader size={20} />
                  </div>
                ) : (
                  <Button className="cursor-pointer">Sign In</Button>
                )}
              </Link>
            </div>
          ) : (
            // If session is available, show the user name
            <div className="text-center w-[150px] px-3 font-light text-[13px] md:text-[15px] flex justify-center items-center">
              {session.user?.name}
            </div>
          )}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-0 bg-transparent hover:bg-transparent">
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
        </div>
      </div>
    </>
  );
};

export default CourseNavbarRoutes;