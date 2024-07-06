import { Productos } from "@/models/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get("id") || ""

    if (id){
      const producto = await Productos.obtenerProductoPorId(parseInt(id))
      if (!producto){
        return NextResponse.json({ data: null }, { status: 400 })
      }
      return NextResponse.json({ data: producto }, { status: 200 })
    }

    const search = url.searchParams.get("search") || ""

    const productos = await Productos.obtenerProductos({ search })
    if (!productos){
      return NextResponse.json({ data: null }, { status: 400 })
    }
    return NextResponse.json({ data: productos }, { status: 200 })
  } catch (error:any) {
    console.log(error.message)
    return NextResponse.json({ data: null }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const productoAgregadoId = await Productos.agregarProducto(data)
    if (!productoAgregadoId){
      return NextResponse.json(null, { status: 400 })
    }
    return NextResponse.json(null, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const productoAgregadoId = await Productos.editarProducto(data)
    if (!productoAgregadoId){
      return NextResponse.json(null, { status: 400 })
    }
    return NextResponse.json(null, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get("id") || ""
    const productoEliminadoId = await Productos.eliminarProducto(parseInt(id))
    if (!productoEliminadoId){
      return NextResponse.json(null, { status: 400 })
    }
    return NextResponse.json(null, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(null, { status: 500 })
  }
}