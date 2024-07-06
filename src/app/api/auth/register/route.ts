import { NextResponse, NextRequest } from "next/server";
import { Usuarios, Roles } from "@/models/auth";

export async function POST(req: Request) {
  try {
    const { nombre, apellidoP, apellidoM, fechaNacimiento, correo, rut, telefono, contra } = await req.json();

    const rol = await Roles.obtenerRol("administrador")
    if (!rol) {
      throw new Error("Rol no encontrado")
    }

    const correoRepetido = await Usuarios.verificarCorreo(correo)
    if (correoRepetido) {
      return NextResponse.json({ error: "El correo ya existe" }, { status: 400 })
    }

    const rutRepetido = await Usuarios.verificarRut(rut)
    if (rutRepetido) {
      return NextResponse.json({ error: "El rut ya existe" }, { status: 400 })
    }

    const contraHash = await Usuarios.hashearContra(contra)

    const usuario = {
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento: new Date(fechaNacimiento),
      email: correo,
      rut,
      telefono,
      contraHash,
      idRol: rol.id,
    }

    const usuarioCreado = await Usuarios.crearUsuario(usuario)
    return NextResponse.json(usuarioCreado, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}