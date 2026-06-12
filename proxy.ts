import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  console.log(token ,"token get ????");
  const pathname = req.nextUrl.pathname;

  // Public routes (NO protection)
  const publicRoutes = ["/login", "/register"];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Protect doctor & hospital routes
  if (
    (pathname.startsWith("/doctor") ||
      pathname.startsWith("/hospital")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/doctor/:path*",
    "/hospital/:path*",
    "/login",
    "/register",
  ],
};