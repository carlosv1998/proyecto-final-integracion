import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('nuevo-token')?.value
  if (!cookie) return NextResponse.next()
  
  const res = NextResponse.next()
  res.cookies.set("nuevo-token", cookie, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30
  })

  return res
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/logout",
  ]
}