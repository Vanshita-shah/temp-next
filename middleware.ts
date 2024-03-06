export { default } from "next-auth/middleware";

// default middleware for protected routes
export const config = {
  matcher: ["/courses/:path*"],
};
