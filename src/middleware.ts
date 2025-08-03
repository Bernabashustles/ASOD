// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth";

// export async function middleware(request: NextRequest) {
//   const sessionCookie = getSessionCookie(request);
//   if (!sessionCookie) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   return NextResponse.next();
// }

// // const
// export const config = {
//   runtime: "experimental-edge",
//   matcher: ["/dashboard"],
// };

import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;
  if (
    sessionCookie &&
    ["/auth", "/auth/signup", "/auth/reset-password", "/auth/verify", "/auth/forgot-password"].includes(
      pathname,
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!sessionCookie && pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/add",
    "/profile",
    "/notifications",
    "/products",
    "/reports",
    "/checkout",
    "/wallet",
    "/pos",
    "/orders",
    "/inventory",
    "/locations",
    "/settings",
    "/inbox",
    "/supplier"
  ],
};