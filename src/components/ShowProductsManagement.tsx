import { ProductsType } from "../../types"
import { ProductsCardManager } from "./PorductCardManager"

export const ShowProductsManagement = async ({ search }: { search?: string }) => {
  
  const res = await fetch(`http://localhost:3000/api/products?search=${search}`)
  const {data} = await res.json()
  const productos = data as ProductsType[]

  return (
  
    <>
      {
        productos?.map((producto, index) => {
          return (
            <ProductsCardManager key={index} producto={producto} />
          )
        })
      }
    </>
  )
}