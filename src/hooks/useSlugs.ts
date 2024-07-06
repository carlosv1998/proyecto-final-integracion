import { useEffect, useState } from "react";
import { categoriasHijasType, categoriasPadresType, categoriasType, coloresType, marcasType, proveedoresType, sucursalesType } from "../../types"

export const useSlugs = () => {
  const [proveedores, setProveedores] = useState<proveedoresType[] | null>([])
  const [marcas, setMarcas] = useState<marcasType[] | null>([])
  const [sucursales, setSucursales] = useState<sucursalesType[] | null>([])
  const [colores, setColores] = useState<coloresType[] | null>([])
  const [categoriasPadres, setCategoriasPadres] = useState<categoriasPadresType[] | null>([])
  const [categoriasHijas, setCategoriasHijas] = useState<categoriasHijasType[] | null>([])
  const [categorias, setCategorias] = useState<categoriasType[] | null>([])
  const [categoriasHijasOriginales, setCategoriasHijasOriginales] = useState<categoriasHijasType[] | null>([])
  const [categoriasOriginales, setCategoriasOriginales] = useState<categoriasType[] | null>([])

  useEffect(() => {
    const getProveedores = async () => {
      const res = await fetch(`http://localhost:3000/api/slugs?query=proveedores`)
      const {data} = await res.json()
      setProveedores(data)
    }
    const getMarcas = async () => {
      const res = await fetch(`http://localhost:3000/api/slugs?query=marcas`)
      const {data} = await res.json()
      setMarcas(data)
    }
    const getSucursales = async () => {
      const res = await fetch(`http://localhost:3000/api/slugs?query=sucursales`)
      const {data} = await res.json()
      setSucursales(data)
    }
    const getColores = async () => {
      const res = await fetch(`http://localhost:3000/api/slugs?query=colores`)
      const {data} = await res.json()
      setColores(data)
    }
    const getCategoriasPadres = async () => {
      const res = await fetch(`http://localhost:3000/api/slugs?query=categoriasPadres`)
      const {data} = await res.json()
      setCategoriasPadres(data)
    }
    const getCategoriasHijas = async () => {
      const res = await fetch(`http://localhost:3000/api/slugs?query=categoriasHijas`)
      const {data} = await res.json()
      setCategoriasHijasOriginales(data)
      setCategoriasHijas(data)
    }
    const getCategorias = async () => {
      const res = await fetch(`http://localhost:3000/api/slugs?query=categorias`)
      const {data} = await res.json()
      setCategoriasOriginales(data)
      setCategorias(data)
    }

    getProveedores()
    getMarcas()
    getSucursales()
    getColores()
    getCategoriasPadres()
    getCategoriasHijas()
    getCategorias()
  }, [])


  const cambiarCategoriaHija = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idCategoriaPadre = parseInt(e.target.value)
    const nuevasCategoriasHijas = categoriasHijas?.filter((categoria) => categoria.idCategoriaPadre === idCategoriaPadre) ?? []
    const nuevasCategorias = categorias?.filter((categoria) => categoria.idCategoriaHija === nuevasCategoriasHijas[0].id) ?? []
    setCategoriasHijasOriginales(nuevasCategoriasHijas)
    setCategoriasOriginales(nuevasCategorias)
  }

  const cambiarCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoriaHija = parseInt(e.target.value)
    const nuevasCategorias = categorias?.filter((categoria) => categoria.idCategoriaHija === categoriaHija) ?? []
    setCategoriasOriginales(nuevasCategorias)
  }

  return { categoriasPadres, categoriasHijasOriginales, categoriasOriginales, cambiarCategoriaHija, cambiarCategoria, proveedores, marcas, sucursales, colores };
};