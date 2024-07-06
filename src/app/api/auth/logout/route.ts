import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    cookieStore.delete("nuevo-token");
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}