export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/^/(apps|api/apps)(/|$)/"],
};
