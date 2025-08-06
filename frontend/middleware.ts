import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as R from "ramda";
import { publicUrls } from "@/Models/App/constants";

export function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;

  if (R.isNotNil(access_token)) {
    //LOGGATO
    if (
      request.nextUrl.pathname === "/" ||
      R.includes(request.nextUrl.pathname, publicUrls)
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (
    R.isNil(access_token) &&
    (request.nextUrl.pathname === "/" ||
      !R.includes(request.nextUrl.pathname, publicUrls))
  ) {
    // NON LOGGATO
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|.*\\.png$|manifest.json|icons/.*).*)",
  ],
};
