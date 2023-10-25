import { NextResponse, NextRequest } from "next/server";
import { basePath } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (path.includes("/auth") && accessToken && refreshToken) {
    return NextResponse.redirect(new URL(basePath + "/home/movies", req.url));
  }

  if (path.includes("/home")) {
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL(basePath + "/auth/login", req.url));
    }
  }

  return NextResponse.next();
}
