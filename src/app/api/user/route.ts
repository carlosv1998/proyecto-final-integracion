import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { variables } from "../../../../const";

interface TokenPayload {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("nuevo-token")?.value;

    if (!token) {
      return NextResponse.json({ usuario: null });
    }

    const tokenValido = jwt.verify(token, variables.JWT_SECRET) as TokenPayload

    if (!tokenValido) {
      return NextResponse.json({ usuario: null });
    }

    const usuario = {
      id: tokenValido.id,
      nombre: tokenValido.nombre,
      correo: tokenValido.email,
      rol: tokenValido.rol
    }

    return NextResponse.json({ usuario })
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}