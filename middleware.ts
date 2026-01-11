import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  // Allow login page
  if (pathname.startsWith("/login")) {
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
  matcher: ["/doctor/:path*", "/hospital/:path*"],
};
