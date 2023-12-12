export { default } from "next-auth/middleware"
 
export const config = { matcher: ["/account", "/submit", "/edit/:path*"] }