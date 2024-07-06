import { ProductsType } from "../../types"
import { ProductsCard } from "./ProductsCard"

export const ShowProductsCards = async ({ search }: { search: string }) => {
  let url = `http://localhost:3000/api/products?search=${search}`
  const res = await fetch(url)
  const {data} = await res.json()
  const productos = data as ProductsType[]

  return (
    <>
      {
        productos?.map((producto, index) => {
          return (
            <ProductsCard key={index} producto={producto} />
          )
        })
      }
    </>
  )
}