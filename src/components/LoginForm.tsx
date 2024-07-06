"use client"
import { useUsuario } from "@/hooks/useUsuario";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { useEffect } from "react";
import { obtenerSesion } from "../../lib/sesion"
import { GoogleIcon } from "@/icons/AuthIcons";

interface TokenPayload {
  id: number;
  nombre: string;
  email: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const { dataUsuario, setDataUsuario } = useUsuario()

  useEffect(() => {
    if (dataUsuario){
      router.push("/logout")
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok){
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center text-black space-y-6 bg-white p-6 rounded-xl min-w-[280px] w-full max-w-[500px] shadow-2xl">
      <h1 className="text-2xl font-bold">Login</h1>
      <input type="email" id="correo" name="correo" placeholder="Correo" className="w-full border border-gray-300 p-2 rounded-lg" />
      <input type="password" id="contra" name="contra" placeholder="Contraseña" className="w-full border border-gray-300 p-2 rounded-lg" />
      <button className="p-2 bg-[#0171D3] text-white rounded-lg w-full">Ingresar</button>
      <p>¿No tienes una cuenta? <a href="/register" className="text-blue-500">Registrate</a></p>
    </form>
  )
}