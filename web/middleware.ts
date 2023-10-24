import { NextResponse, NextRequest } from "next/server";
import { basePath } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const accessToken = req.cookies.get("movies-crud-session-cookie");
  const refreshToken = req.cookies.get("movies-crud-refresh-cookie");

  if (path.includes("/auth")) {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL(basePath + "/home/movies", req.url));
    }
    return NextResponse.next();
  }

  if (path.includes("/home")) {
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL(basePath + "/auth/login", req.url));
    }
  }

  return NextResponse.next();
}
