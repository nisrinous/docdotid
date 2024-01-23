import { NextResponse, type NextRequest } from "next/server";
// import { DOCTOR_ROLE, PHARMACY_ADMIN_ROLE, SUPER_ADMIN_ROLE } from "./config";

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(request: NextRequest) {
  // const token = await getToken({ req, secret });
  const { pathname } = request.nextUrl;
  const MyBxyWYaeX = request.cookies.get("MyBxyWYaeX")?.value; // token

  const doctorPath = "/doctor";
  const pharmaciesAdminPath = "/pharmacyadm/";
  const superAdminPath = [
    "/admin/products",
    "/admin/users",
    "/admin/categories",
    "/admin/orders",
  ];
  // const adminAndPharmacyAdminPath = "/dashboard/sales-report";

  const doctorProtectedPath = pathname.startsWith(doctorPath);
  const pharmaciesAdminProtectedPath = pathname.startsWith(pharmaciesAdminPath);
  const superAdminProtectedPath = superAdminPath.some((path) =>
    pathname.startsWith(path)
  );
  // const adminAndPharmacyAdminProtectedPath = pathname.startsWith(
  //   adminAndPharmacyAdminPath
  // );

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
  // if (superAdminProtectedPath) {
  //   if (!isAuthenticated) {
  //     const url = new URL(
  //       process.env.NEXT_PUBLIC_SITE_PATH + `/auth/login`,
  //       req.url
  //     );
  //     url.searchParams.set("callbackUrl", req.nextUrl.pathname);
  //     return NextResponse.redirect(url);
  //   }
  //   if (token.user_role_id !== SUPER_ADMIN_ROLE) {
  //     const url = new URL(process.env.NEXT_PUBLIC_SITE_PATH + `/403`, req.url);
  //     return NextResponse.rewrite(url);
  //   }
  // } else if (adminAndPharmacyAdminProtectedPath) {
  //   if (!isAuthenticated) {
  //     const url = new URL(
  //       process.env.NEXT_PUBLIC_SITE_PATH + `/auth/login`,
  //       req.url
  //     );
  //     url.searchParams.set("callbackUrl", req.nextUrl.pathname);
  //     return NextResponse.redirect(url);
  //   }
  //   if (
  //     token.user_role_id !== SUPER_ADMIN_ROLE &&
  //     token.user_role_id !== PHARMACY_ADMIN_ROLE
  //   ) {
  //     const url = new URL(process.env.NEXT_PUBLIC_SITE_PATH + `/403`, req.url);
  //     return NextResponse.rewrite(url);
  //   }
  // } else if (doctorProtectedPath) {
  //   if (!isAuthenticated) {
  //     const url = new URL(
  //       process.env.NEXT_PUBLIC_SITE_PATH + `/auth/login`,
  //       req.url
  //     );
  //     url.searchParams.set("callbackUrl", req.nextUrl.pathname);
  //     return NextResponse.redirect(url);
  //   }
  //   if (token.user_role_id !== DOCTOR_ROLE) {
  //     const url = new URL(process.env.NEXT_PUBLIC_SITE_PATH + `/403`, req.url);
  //     return NextResponse.rewrite(url);
  //   }
  // } else if (pharmaciesAdminProtectedPath) {
  //   if (!isAuthenticated) {
  //     const url = new URL(
  //       process.env.NEXT_PUBLIC_SITE_PATH + `/auth/login`,
  //       req.url
  //     );
  //     url.searchParams.set("callbackUrl", req.nextUrl.pathname);
  //     return NextResponse.redirect(url);
  //   }
  //   if (token.user_role_id !== PHARMACY_ADMIN_ROLE) {
  //     const url = new URL(process.env.NEXT_PUBLIC_SITE_PATH + `/403`, req.url);
  //     return NextResponse.rewrite(url);
  //   }
  // } else {
  //   if (isAuthenticated) {
  //     if (token.user_role_id === SUPER_ADMIN_ROLE) {
  //       return NextResponse.redirect(
  //         new URL(
  //           process.env.NEXT_PUBLIC_SITE_PATH + "/dashboard/products",
  //           req.url
  //         )
  //       );
  //     } else if (token.user_role_id === PHARMACY_ADMIN_ROLE) {
  //       return NextResponse.redirect(
  //         new URL(
  //           process.env.NEXT_PUBLIC_SITE_PATH + "/dashboard/pharmacies",
  //           req.url
  //         )
  //       );
  //     } else if (token.user_role_id === DOCTOR_ROLE) {
  //       return NextResponse.redirect(
  //         new URL(process.env.NEXT_PUBLIC_SITE_PATH + "/doctor", req.url)
  //       );
  //     }
  //   }
  // }

  return NextResponse.next();
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
