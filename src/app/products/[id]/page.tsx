"use client"
import { useParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ProductsType } from "../../../../types"
import { SectionContainer } from "@/components/SectionContainer"
import Image from "next/image"
import { ProductDetail } from "@/components/ProductDetail"


export default function ProductDetails() {
  const [producto, setProducto] = useState<ProductsType | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchProducto = async () => {
      const res = await fetch(`/api/products?id=${id}`)
      const {data} = await res.json()
      setProducto(data as ProductsType)
    }
    fetchProducto()
  }, [id])

  return (
    <SectionContainer> 
      <div className="w-full flex justify-center h-full overflow-auto">
        <Suspense key={producto?.id} fallback={<div>Cargando producto...</div>}>
          {producto && <ProductDetail producto={producto} />}
        </Suspense>
      </div>
    </SectionContainer>
  )
} 