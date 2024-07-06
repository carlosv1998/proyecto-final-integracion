import { Productos } from "@/models/auth";
import { NextResponse, NextRequest } from "next/server";
import { Usuarios } from "@/models/auth";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const correo = url.searchParams.get("correo") || ""
    const correoExistente = await Usuarios.verificarCorreo(correo)
    if (correoExistente){
      return NextResponse.json({ data: null }, { status: 400 })
    }
    return NextResponse.json({ data: null }, { status: 200 })
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json({ data: null }, { status: 500 })
  }
}
