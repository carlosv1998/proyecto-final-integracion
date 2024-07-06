
export const obtenerSesion = async () => {
  try {
    const res = await fetch("/api/auth/login")
    const { usuario } = await res.json()
    

    if (usuario){
      const usuarioEncontrado = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.email,
      }

      return usuarioEncontrado
    }
  } catch (error) {
    console.log(error)
  }
}

export const cerrarSesion = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
    if (res.ok){
      return true;
    }
    return false;
  } catch (error) {
    console.log(error)
  }
}
