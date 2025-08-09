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
    return NextResponse.redirect(new URL("/steps/choose", request.url));
  }
  if (
    !sessionCookie && 
    pathname.startsWith("/") && 
    !["/auth", "/auth/signup", "/auth/reset-password", "/auth/verify", "/auth/forgot-password"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth",
    "/auth/signup",
    "/auth/reset-password", 
    "/auth/verify",
    "/auth/forgot-password",
    "/steps/:path*",
    "/store/:path*"
  ],
};