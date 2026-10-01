import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { isRestricted } from "@/lib/access";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let role: string | null = null;
  const token = req.cookies.get("session")?.value;
  if (token) {
    try { role = (await jwtVerify(token, new TextEncoder().encode(process.env.SESSION_SECRET))).payload.role as string; } catch {}
  }
  if (!role) return NextResponse.redirect(new URL("/login", req.url));
  if (role !== "student" && isRestricted(pathname)) {
    return NextResponse.rewrite(new URL("/access-denied", req.url), { status: 403 });
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|images|favicon.ico|login|access-denied).*)"] };
