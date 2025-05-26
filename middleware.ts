// middleware.ts
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  PublicRoutes,
  apiAuthPrefix,
} from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);


  if (isApiAuthRoute) {
    return;
  }


  if (isLoggedIn) {
    return; 
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }


  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
});


export const config = {
  matcher: [
    // Skip _next, static files, and /api/uploadthing
    "/((?!api/uploadthing|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
  ],
};