
import { ProductsType } from "../../types"
import Image from "next/image"
import { ProductStars } from "./ProductStars"
import { CartIcon } from "@/icons/ProductsIcons"
import { Toaster, toast } from "sonner"



export const ProductDetail = ({ producto }: { producto: ProductsType }) => {

  // const addToCart = (producto: ProductsType) => () => {
  //   const productInCart = cart?.findIndex(p => p.id === producto.id)
  //   if (productInCart === -1) {
  //     setCart(prevState => [...prevState, {
  //       ...producto,
  //       cantidadCarro: 1
  //     }])
  //   }else {
  //     const newCart = structuredClone(cart)
  //     newCart[productInCart].cantidadCarro! += 1
  //     setCart(newCart)
  //   }
  //   toast.success("Producto agregado al carro")
  // }


  const estaEnDescuento = producto.descuento > 0
  const precioLocal = producto.precio.toLocaleString("es-Es", {
    currency: "CLP"
  })

  const precioConDescuento = producto.precio - (producto.precio * producto.descuento / 100)
  const precioConDescuentoLocal = precioConDescuento.toLocaleString("es-Es", {
    currency: "CLP"
  })

  return (
    <div className="w-full h-full flex flex-col gap-2 shadow-2xl bg-white rounded-lg p-6">
      <div className="relative w-full h-[300px]">
        <Image
          className="object-contain"
          src="/imagen.png"
          fill
          alt="producto"
        />
      </div>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl font-bold capitalize break-words">{producto.nombre}</h2>
        <p className="truncate">
          {producto.descripcion}
        </p>
      </div>

      {producto.calificacion > 0 && <ProductStars calificacion={producto.calificacion} cantidadCalificaciones={producto.cantidadCalificaciones} />}

      <div className="px-4 py-1 flex flex-col gap-2">
        <div className="">
          <span className="text-xs font-bold bg-black rounded-full p-1 text-white">{producto.marcas.nombre}</span>
        </div>
        {
          estaEnDescuento && <span className="font-light text-sm line-through text-gray-600">${precioLocal}</span>
        }
        <div className="flex gap-2 items-center">
          {
            estaEnDescuento ?
            <>
              <span className="font-normal text-2xl text-green-500">${precioConDescuentoLocal}</span>
              <span className="text-xs rounded-2xl bg-yellow-400 px-0.5">-{producto.descuento}%</span>
            </>
            :
            <span className="font-normal text-2xl text-green-500">${precioLocal}</span>
          }
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          className="p-4 w-full max-w-[200px] bg-blue-500 text-white rounded-lg flex gap-2 items-center justify-center"
        >
          <span>Agregar al carro</span>
          <CartIcon color="#fff"/>
        </button>
      </div>
      <Toaster />
    </div>
  )
}