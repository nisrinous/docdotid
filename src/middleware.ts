import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const MyBxyWYaeX = request.cookies.get("MyBxyWYaeX")?.value;

  if (request.nextUrl.pathname == "/" && MyBxyWYaeX === "A@O&XB)e7#n") {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (request.nextUrl.pathname == "/" && MyBxyWYaeX === "PvsHv1B[fGS") {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (request.nextUrl.pathname == "/" && MyBxyWYaeX === "doctor") {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (request.nextUrl.pathname == "/" && MyBxyWYaeX === "UwJw+O5Wn5n") {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (
    (request.nextUrl.pathname == "/" ||
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/doctor") ||
      request.nextUrl.pathname.startsWith("/user")) &&
    MyBxyWYaeX !== "A@O&XB)e7#n" &&
    MyBxyWYaeX !== "PvsHv1B[fGS" &&
    MyBxyWYaeX !== "doctor" &&
    MyBxyWYaeX !== "UwJw+O5Wn5n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/auth/login");
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    MyBxyWYaeX === "PvsHv1B[fGS"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    MyBxyWYaeX === "doctor"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    MyBxyWYaeX === "UwJw+O5Wn5n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    MyBxyWYaeX === "A@O&XB)e7#n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    MyBxyWYaeX === "doctor"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    MyBxyWYaeX === "UwJw+O5Wn5n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (
    request.nextUrl.pathname.startsWith("/doctor") &&
    MyBxyWYaeX === "A@O&XB)e7#n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/doctor") &&
    MyBxyWYaeX === "PvsHv1B[fGS"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/doctor") &&
    MyBxyWYaeX === "UwJw+O5Wn5n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }

  if (
    request.nextUrl.pathname.startsWith("/user") &&
    MyBxyWYaeX === "A@O&XB)e7#n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    request.nextUrl.pathname.startsWith("/user") &&
    MyBxyWYaeX === "PvsHv1B[fGS"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (request.nextUrl.pathname.startsWith("/user") && MyBxyWYaeX === "doctor") {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    MyBxyWYaeX === "A@O&XB)e7#n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    MyBxyWYaeX === "PvsHv1B[fGS"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin");
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    MyBxyWYaeX === "doctor"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/doctor/home");
  }

  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    MyBxyWYaeX === "UwJw+O5Wn5n"
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/");
  }
}

export const config = {
  matcher: [
    "/:path*",
    "/admin/:path*",
    "/pharmacyadm/:path*",
    "/doctor/:path*",
    "/user/:path*",
  ],
};
