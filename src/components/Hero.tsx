"use client"
import { useUsuario } from "@/hooks/useUsuario"

export const Hero = () => {
  const { dataUsuario } = useUsuario()
  return (
    <div>
      <h1>PAGINA DE INICIO</h1>
      {
        dataUsuario ? (
          <p>Hola {dataUsuario.nombre}</p>
        ) : null
      }
    </div>
  )
}