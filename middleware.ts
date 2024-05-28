export { auth as middleware } from "@/lib/auth";

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/api/:path*", "/home/:path*"],
};
