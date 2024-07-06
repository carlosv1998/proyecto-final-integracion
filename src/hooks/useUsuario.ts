import { useContext, useEffect } from "react";
import { ContextoUsuario } from "@/context/UserContext";

export function useUsuario() {
  const context = useContext(ContextoUsuario)
  if (!context){
    throw new Error("No se encontro el contexto de usuario");
  }

  const { dataUsuario, setDataUsuario } = context;

  useEffect(() => {
    const obtenerUsuario = async () => {
      const response = await fetch('/api/user');
      const {usuario} = await response.json();
      setDataUsuario(usuario);
    }

    obtenerUsuario();
  }, [setDataUsuario])

  return { dataUsuario, setDataUsuario };
}