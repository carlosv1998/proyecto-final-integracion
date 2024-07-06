import { Usuarios } from "@/models/auth";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const { correo, contra } = await req.json();
    const usuario = await Usuarios.verificarContra({ contra, email:correo })

    if (!usuario) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 400 })
    }
    const token = await Usuarios.generarToken({ id: usuario.id, email: usuario.email, nombre: usuario.nombre, idRol: usuario.idRol })

    const response = NextResponse.json({ status: 200 });
    response.cookies.set("nuevo-token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30
    });

    return response;

  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}