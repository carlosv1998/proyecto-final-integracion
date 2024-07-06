"use client"
import { useUsuario } from "@/hooks/useUsuario"
import { useRouter } from "next/navigation"
import { cerrarSesion } from "../../lib/sesion"
import { SectionContainer } from "./SectionContainer"


export const LogoutForm = () => {
  const router = useRouter()
  const { dataUsuario, setDataUsuario } = useUsuario()

  const cerrarSesionUsuario = async () => {
    const cerrar = await cerrarSesion()
    if (cerrar){
      setDataUsuario(null)
      router.push("/")
    }else {
      console.log("Error al cerrar sesión")
    }
  }

  return (
    <SectionContainer>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full sm:w-3/4 lg:w-[500px] bg-white text-center flex flex-col items-center gap-3 border border-t-gray-200 shadow-lg p-2.5">
          <h1 className="font-semibold text-2xl">Cerrar sesión</h1>
          <p>Hola <span className="text-blue-500">{dataUsuario?.correo}</span> ¿quieres cerrar la sesión?</p>
          <div className="flex gap-3 justify-center w-full sm:w-2/4">
            <button onClick={() => router.push("/")} className="px-2 py-2 w-full rounded-lg border border-[#09f] text-[#09f] font-semibold">Cancelar</button>
            <button onClick={cerrarSesionUsuario} className="px-2 py-2 w-full bg-[#09f] text-white rounded-lg font-semibold">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </SectionContainer>
  )

}