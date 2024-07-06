import { Categorias, Colores, Marcas, Proveedores, Sucursales, CategoriasPadres, CategoriasHijas } from "@/models/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const query = url.searchParams.get("query") || ""
    let data = null
    if (query === "proveedores"){
      data = await Proveedores.obtenerProveedores()
    }else if (query === "marcas"){
      data = await Marcas.obtenerMarcas()
    }else if (query === "sucursales"){
      data = await Sucursales.obtenerSucursales()
    }else if (query === "categoriasPadres"){
      data = await CategoriasPadres.obtenerCategoriasPadres()
    }else if (query === "categoriasHijas"){
      data = await CategoriasHijas.obtenerCategoriasHijas()
    }else if (query === "categorias"){
      data = await Categorias.obtenerCategorias()
    }else if (query === "colores"){
      data = await Colores.obtenerColores()
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json({ data: null }, { status: 500 })
  }
}