export { default } from "next-auth/middleware";

// protected routes based on session and jwt token
export const config = { matcher: ["/add-course", "/my-courses", "/dashboard"] };
