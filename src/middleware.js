import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");
  const privateRoutes = ["/api/logout", "/profile"];
  const publicRoutes = ["/api/login", "/api/register", "/login", "/register"];

  // Handle private-only routes
  if (privateRoutes.includes(req.nextUrl.pathname) && !authToken.value) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Handle public-only routes
  if (publicRoutes.includes(req.nextUrl.pathname) && authToken.value) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
}

export const config = {
  matcher: [
    "/api/login",
    "/api/register",
    "/api/logout",
    "/login",
    "/register",
    "/profile",
  ],
};
