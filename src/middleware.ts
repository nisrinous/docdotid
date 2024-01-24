import { NextResponse, type NextRequest } from "next/server";
import path from "path";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const MyBxyWYaeX = request.cookies.get("MyBxyWYaeX")?.value; // token

  const doctorPath = "/doctor";
  const pharmaciesAdminPath = "/pharmacyadm";
  const superAdminPath = "/admin";

  const doctorProtectedPath = pathname.startsWith(doctorPath);
  const pharmaciesAdminProtectedPath = pathname.startsWith(pharmaciesAdminPath);

  const superAdminProtectedPath = pathname.startsWith(superAdminPath);

  const isAuthenticated = !!MyBxyWYaeX;
  if (pathname.startsWith("/auth") && isAuthenticated) {
    if (MyBxyWYaeX && MyBxyWYaeX === "A@O&XB)e7#n") {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/admin", request.url)
      );
    }
    if (MyBxyWYaeX && MyBxyWYaeX === "PvsHv1B[fGS") {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/pharmacyadm", request.url)
      );
    }
    if (MyBxyWYaeX && MyBxyWYaeX === "doctor") {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/doctor", request.url)
      );
    }
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/", request.url)
    );
  }

  if (superAdminProtectedPath) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + `/auth/login`, request.url)
      );
    }
    if (MyBxyWYaeX !== "A@O&XB)e7#n") {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/", request.url)
      );
    }
  } else if (doctorProtectedPath) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(
          process.env.NEXT_PUBLIC_SITE_PATH + `/auth/login/doctor`,
          request.url
        )
      );
    }
    if (MyBxyWYaeX !== "doctor") {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/", request.url)
      );
    }
  } else if (pharmaciesAdminProtectedPath) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + `/auth/login`, request.url)
      );
    }
    if (MyBxyWYaeX !== "PvsHv1B[fGS") {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/", request.url)
      );
    }
  } else {
    if (isAuthenticated) {
      if (MyBxyWYaeX === "A@O&XB)e7#n") {
        return NextResponse.redirect(
          new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/admin", request.url)
        );
      } else if (MyBxyWYaeX === "PvsHv1B[fGS") {
        return NextResponse.redirect(
          new URL(
            process.env.NEXT_PUBLIC_SITE_PATH + "/pharmacyadm",
            request.url
          )
        );
      } else if (MyBxyWYaeX === "doctor") {
        return NextResponse.redirect(
          new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/doctor", request.url)
        );
      }
    } else if (!isAuthenticated && pathname.startsWith("/user")) {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin",
    "/admin/:path*",
    "/pharmacyadm/:path*",
    "/pharmacyadm/",
    "/doctor/:path*",
  ],
};
