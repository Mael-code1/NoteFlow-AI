import { NextRequest, NextResponse } from "next/server";
import { jwtDecrypt, jwtVerify } from "jose";
import { use } from "react";

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretkey"
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = await jwtVerify(token, secretKey);
    //qui logre extraer id del user que utilizare pero todavia no planifico bien como insertal al notas esta en proceso
    const Userid = user.payload.id;

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/home", "/home/editor"],
};
