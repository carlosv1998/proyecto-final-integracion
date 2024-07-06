"use client"
import { useSlugs } from "@/hooks/useSlugs"
import { FilterIcon } from "@/icons/MenuIcons"
import { useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"


export const Filters = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [precioMin, setPrecioMin] = useState(0)
  const [precioMax, setPrecioMax] = useState(0)
  const { marcas, categoriasPadres, categoriasHijasOriginales, categoriasOriginales, cambiarCategoriaHija, cambiarCategoria } = useSlugs()

  // const handleMinPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const precio = parseInt(e.target.value)
  //   if (precio >= precioMax){
  //     setPrecioMax(precio)
  //     setPrecioMin(precio)
  //   }else {
  //     setPrecioMin(precio)
  //   }
  // }

  // const handleMaxPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const precio = parseInt(e.target.value)
  //   if (precio <= precioMin){
  //     setPrecioMin(precio)
  //     setPrecioMax(precio)
  //   }else {
  //     setPrecioMax(precio)
  //   }
  // }

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleMinPrice = (minPrice: string) => {
    const params = new URLSearchParams(searchParams)
    if (minPrice !== "-"){
      params.set("minprice", minPrice)
    }else {
      params.delete("minprice")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleMaxPrice = (maxPrice: string) => {
    const params = new URLSearchParams(searchParams)
    if (maxPrice !== "-"){
      params.set("maxprice", maxPrice)
    }else {
      params.delete("maxprice")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleApplyFilters = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    
  }

  return (
    <div className="">
      <button
        className="gap-2 items-center justify-end px-4 py-1 bg-black rounded-lg text-white flex lg:hidden z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Filtros</span>
        <FilterIcon />
      </button>

      <div className="w-full h-full flex flex-col gap-1">
        <h1 className="font-bold hidden lg:block">Filtros</h1>
        <div className={
          `overflow-auto gap-2 pb-[100px]
          ${isOpen
          ? "absolute top-32 left-0 bottom-0 right-0 bg-white/90 flex flex-col items-center w-full backdrop-blur-sm z-10 p-4 lg:static lg:h-full lg:w-[300px]"
          : "hidden lg:block lg:w-[300px]"
          }
        `}>
          <div className="flex flex-col gap-1 w-full items-center">
            <h2 className="font-bold">Precio</h2>
            
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="" htmlFor="min">Mínimo</label>
                <select
                  name="min"
                  id="min"
                  className="w-full px-2 py-1 bg-black rounded-lg text-white"
                  onChange={(e) => handleMinPrice(e.target.value)}
                  defaultValue={searchParams.get("min-price")?.toString()}
                >
                  <option value="-">-</option>
                  <option value="0">0</option>
                  <option value="1000">1000</option>
                  <option value="10000">10000</option>
                  <option value="100000">100000</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row">
                <label className="" htmlFor="max">Máximo</label>
                <select
                  name="max"
                  id="max"
                  className="w-full px-2 py-1 bg-black rounded-lg text-white"
                  onChange={(e) => handleMaxPrice(e.target.value)}
                  defaultValue={searchParams.get("max-price")?.toString()}
                >
                  <option value="-">-</option>
                  <option value="1000">1000</option>
                  <option value="10000">10000</option>
                  <option value="100000">100000</option>
                  <option value="1000000">1000000</option>
                </select>
              </div>
            </div>

            <h2 className="font-bold">Marca</h2>
            <select name="marcas" id="marcas" className="w-full px-2 py-1 bg-black rounded-lg text-white overflow-auto">
              {
                marcas?.map((marca) => {
                  return <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                })
              }
            </select>
            <h2 className="font-bold">Categoría</h2>
            <div className="w-full flex flex-col gap-1">
              <select name="categoriasPadres" id="categoriasPadres" className="w-full px-2 py-1 bg-black rounded-lg text-white overflow-auto" onChange={cambiarCategoriaHija}>
                {
                  categoriasPadres?.map((categoria) => {
                    return <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  })
                }
              </select>
              <select name="categoriasHijas" id="categoriasHijas" className="w-full px-2 py-1 bg-black rounded-lg text-white overflow-auto" onChange={cambiarCategoria}>
                {
                  categoriasHijasOriginales?.map((categoria) => {
                    return <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  })
                }
              </select>
              <select name="categorias" id="categorias" className="w-full px-2 py-1 bg-black rounded-lg text-white overflow-auto">
                {
                  categoriasOriginales?.map((categoria) => {
                    return <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  })
                }
              </select>
            </div>

            <button className="px-2 py-1 bg-blue-600 rounded-lg text-white mt-4" onClick={handleApplyFilters}>Aplicar filtros</button>
          </div>
        </div>
      </div>
    </div>
  )
}