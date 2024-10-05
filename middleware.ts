import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretkey"
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Token cookie:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decodedToken = await jwtVerify(token, secretKey);
    console.log("Token decodificado:", decodedToken);
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: ["/home"],
};
