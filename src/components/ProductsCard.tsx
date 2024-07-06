import { ProductsType } from "../../types"
import Image from "next/image"
import { ProductStars } from "@/components/ProductStars"


export const ProductsCard = ({ producto }: { producto: ProductsType }) => {

  const estaEnDescuento = producto.descuento > 0
  const precioLocal = producto.precio.toLocaleString("es-Es", {
    currency: "CLP"
  })

  const precioConDescuento = producto.precio - (producto.precio * producto.descuento / 100)
  const precioConDescuentoLocal = precioConDescuento.toLocaleString("es-Es", {
    currency: "CLP"
  })

  return (
    <a href={`/products/${producto.id}`} className=" bg-white rounded-lg shadow-2xl overflow-hidden pb-4 w-full">

      <div className="relative w-full h-[170px]">
        <Image
          className="object-contain"
          src="/imagen.png"
          fill
          alt="producto"
        />
      </div>

      <div className="p-4 flex flex-col">
        <h2 className="text-xl font-bold capitalize break-words">{producto?.nombre}</h2>
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
    </a>
  )
}