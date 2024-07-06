"use client"
import Image from "next/image"
import { ProductsType } from "../../types"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"

export const ProductsCardManager = ({ producto }: { producto: ProductsType }) => {
  const router = useRouter()
  const precio = producto.precio.toLocaleString("es-Es", {currency: "CLP"})
  
  const deleteItem = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
      method: "DELETE"
    })
    if (res.ok){
      router.push("/management/products-management")
      toast.success("Producto eliminado con éxito")
    }
  }

  return (
    <div className="w-full flex flex-col gap-2 p-3 bg-white rounded-lg shadow-lg">
      <header className="relative w-full lg:w-[300px] h-[170px]">
        <Image
          className="object-contain"
          src="/imagen.png"
          fill
          alt="producto"
        />
      </header>
      <div className="flex flex-col gap-2 justify-between w-full">
        <main className="w-full lg:flex-1 max-w-[500px]">
          <h2 className="text-xl font-bold capitalize break-words">{producto?.nombre}</h2>
          <p className="truncate"><span className="font-semibold">Descripción:</span> {producto.descripcion}</p>
          <p><span className="font-semibold">Precio:</span> ${precio}</p>
          <p><span className="font-semibold">Descuento:</span> {producto.descuento}%</p>
          <p><span className="font-semibold">Stock:</span> {producto.cantidad}</p>
          <p><span className="font-semibold">Marca:</span> {producto.marcas.nombre}</p>
          <p><span className="font-semibold">Proveedor:</span> {producto.proveedores.nombre}</p>
          
        </main>
        <footer className="flex flex-col gap-2 mt-4">
          <a href={`/management/products-management/edit/${producto.id}`} className="p-2 bg-black w-full hover:bg-gray-600 hover:cursor-pointer text-white text-center rounded-lg">Editar</a>
          <a className="p-1 bg-black w-full hover:bg-gray-600 hover:cursor-pointer text-white text-center rounded-lg">Detalles</a>
          <a onClick={() => deleteItem(producto.id)} className="p-1 bg-black w-full hover:bg-gray-600 hover:cursor-pointer text-white text-center rounded-lg">Eliminar</a>
          <a className="p-1 bg-black w-full hover:bg-gray-600 hover:cursor-pointer text-white text-center rounded-lg">Ver en tienda</a>
        </footer>
        <Toaster />
      </div>
    </div>
  )
}
