"use client"

export const obtenerProveedores = async () => {
  const proveedores = await fetch(`http://localhost:3000/api/slugs?query=proveedores`)
  return proveedores.json()
}

export const obtenerMarcas = async () => {
  const marcas = await fetch(`http://localhost:3000/api/slugs?query=marcas`)
  return marcas.json()
}

export const obtenerSucursales = async () => {
  const sucursales = await fetch(`http://localhost:3000/api/slugs?query=sucursales`)
  return sucursales.json()
}

export const obtenerCategoriasPadres = async () => {
  const categoriasPadres = await fetch(`http://localhost:3000/api/slugs?query=categoriasPadres`)
  return categoriasPadres.json()
}

export const obtenerCategoriasHijas = async () => {
  const categoriasHijas = await fetch(`http://localhost:3000/api/slugs?query=categoriasHijas`)
  return categoriasHijas.json()
}

export const obtenerCategorias = async () => {
  const categorias = await fetch(`http://localhost:3000/api/slugs?query=categorias`)
  return categorias.json()
}

export const obtenerColores = async () => {
  const colores = await fetch(`http://localhost:3000/api/slugs?query=colores`)
  return colores.json()
}