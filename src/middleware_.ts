import { NextResponse, type NextRequest } from "next/server";
import { UseAuthMiddleware } from "./lib/authMiddleware";

export function middleware(request: NextRequest) {
  // const role = UseAuthMiddleware();
  const role = request.cookies.get("role")?.value;

  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname == "/" && role === "admin") {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (request.nextUrl.pathname == "/" && role === "adminPharmacy") {
    return NextResponse.redirect(
      request.nextUrl.origin + "/adminPharmacy/home"
    );
  }

  if (request.nextUrl.pathname == "/" && role === "doctor") {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (request.nextUrl.pathname == "/" && role === "user") {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (
    (request.nextUrl.pathname == "/" ||
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/adminPharmacy") ||
      request.nextUrl.pathname.startsWith("/doctor") ||
      request.nextUrl.pathname.startsWith("/user")) &&
    role !== "admin" &&
    role !== "adminPharmacy" &&
    role !== "doctor" &&
    role !== "user"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/auth/login");
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    role === "adminPharmacy"
  ) {
    return NextResponse.redirect(
      request.nextUrl.origin + "/adminPharmacy/home"
    );
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role === "doctor") {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role === "user") {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (
    request.nextUrl.pathname.startsWith("/adminPharmacy") &&
    role === "admin"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/adminPharmacy") &&
    role === "doctor"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (
    request.nextUrl.pathname.startsWith("/adminPharmacy") &&
    role === "user"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (request.nextUrl.pathname.startsWith("/doctor") && role === "admin") {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/doctor") &&
    role === "adminPharmacy"
  ) {
    return NextResponse.redirect(
      request.nextUrl.origin + "/adminPharmacy/home"
    );
  }

  if (request.nextUrl.pathname.startsWith("/doctor") && role === "user") {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (request.nextUrl.pathname.startsWith("/user") && role === "admin") {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/user") &&
    role === "adminPharmacy"
  ) {
    return NextResponse.redirect(
      request.nextUrl.origin + "/adminPharmacy/home"
    );
  }

  if (request.nextUrl.pathname.startsWith("/user") && role === "doctor") {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    role === "admin"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    role === "adminPharmacy"
  ) {
    return NextResponse.redirect(
      request.nextUrl.origin + "/adminPharmacy/home"
    );
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    role === "doctor"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    role === "user"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }
}

export const config = {
  matcher: [
    "/:path*",
    "/admin/:path*",
    "/adminPharmacy/:path*",
    "/doctor/:path*",
    "/user/:path*",
  ],
};