"use client"
import { SectionContainer } from "@/components/SectionContainer"
import { FormAddProducts } from "@/components/FormAddProducts"
import { useEffect, useState } from "react"
import { useSlugs } from "@/hooks/useSlugs"



export default function AddProductsPage() {
  
  const { proveedores, marcas, sucursales, colores, categoriasPadres, categoriasHijasOriginales, categoriasOriginales, cambiarCategoriaHija, cambiarCategoria } = useSlugs()

  return (
    <SectionContainer>
      <div className="flex flex-col w-full h-full overflow-auto items-center space-y-4">
        <h1 className="text-2xl font-bold">Agregar producto</h1>
        <FormAddProducts
          method="POST"
          producto={null}
          proveedores={proveedores}
          marcas={marcas}
          sucursales={sucursales}
          colores={colores}
          categoriasPadres={categoriasPadres}
          categoriasHijas={categoriasHijasOriginales}
          categorias={categoriasOriginales}
          cambiarCategoriaHija={cambiarCategoriaHija}
          cambiarCategoria={cambiarCategoria}
        />
      </div>
    </SectionContainer>
  )
}