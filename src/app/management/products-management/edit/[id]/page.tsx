"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ProductsType } from "../../../../../../types"
import { SectionContainer } from "@/components/SectionContainer"
import { useSlugs } from "@/hooks/useSlugs"
import { FormAddProducts } from "@/components/FormAddProducts"


export default function EditProductsPage() {
  const [producto, setProducto] = useState<ProductsType | null>(null)
  const { proveedores, marcas, sucursales, colores, categoriasPadres, categoriasHijasOriginales, categoriasOriginales, cambiarCategoriaHija, cambiarCategoria } = useSlugs()
  const { id } = useParams()


  useEffect(() => {
    const fetchProducto = async () => {
      const res = await fetch(`http://localhost:3000/api/products?id=${id}`)
      const {data} = await res.json()
      setProducto(data as ProductsType)
    }
    fetchProducto()
  }, [id])

  return (
    <SectionContainer>
      <div className="w-full h-full flex flex-col gap-2 items-center">
        <FormAddProducts
          method="PUT"
          producto={producto}
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