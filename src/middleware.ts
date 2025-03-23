import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwttoken");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/home/:path+"], // Apply middleware to all routes under /dashboard
};
