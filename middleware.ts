import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

//Customising default middleware
export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/courses")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const unAuthenticatedRoutes = ["/", "/login", "/register"];

    //redirect authenticated users to courses page
    if (
      req.nextauth.token &&
      unAuthenticatedRoutes.includes(req.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/courses", req.url));
    }

    //redirect unauthenticated users to login page
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/courses")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return null;
  },
  {
    callbacks: {
      //middlware will run if this returns true
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
