import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = (await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })) as JWT & { role?: string };

  const isAuthPage = request.nextUrl.pathname.startsWith("/admin/login");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (token && request.nextUrl.pathname.startsWith("/admin") && !isAuthPage) {
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
