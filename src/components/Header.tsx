"use client"
import { useUsuario } from "@/hooks/useUsuario"
import { CloseIcon, MenuIcon } from "@/icons/MenuIcons"
import Link from "next/link"
import { useState } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { CartIcon } from "@/icons/ProductsIcons"

type MenuItem = {
  title: string,
  slug: string,
  href: string,
  valid: boolean
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const { dataUsuario } = useUsuario()

  const letraUsuario = dataUsuario?.correo.charAt(0).toUpperCase()

  return (
    <header>
      <nav className={`-full bg-white rounded-xl flex p-2 ${dataUsuario ? "justify-between" : "justify-end"} px-4 items-center`}>
        {
          dataUsuario ?
          <div className="flex gap-1 items-center rounded-xl p-1">
            <span className="bg-purple-500 px-2 rounded-full text-white">{letraUsuario}</span>
            <span className="text-xs md:text-md font-bold">{dataUsuario?.nombre}</span>
          </div> : null
        }
        <button
          className="md:hidden flex items-center gap-2 bg-black py-1 pl-2 pr-4 rounded-xl z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {
            isOpen ? <CloseIcon /> : <MenuIcon />
          }
          <span className="font-semibold text-sm text-white">Menú</span>
        </button>

        <MenuList isOpen={isOpen} close={close} />
      </nav>

    </header>
  )
}


const MenuList = ({ isOpen, close } : { isOpen: boolean, close: () => void }) => {

  const { dataUsuario } = useUsuario()

  const menuItems : MenuItem[] = [
    {
      title: "Inicio",
      slug: "",
      href: "/",
      valid: true
    },
    {
      title: "Productos",
      slug: "products",
      href: "/products",
      valid: true
    },
    {
      title: "Administración",
      slug: "management",
      href: "/management",
      valid: dataUsuario?.rol === "admin"
    },
    {
      title: "Estadísticas",
      slug: "statistics",
      href: "/statistics",
      valid: dataUsuario?.rol === "admin"
    },
    {
      title: "Cerrar sesión",
      slug: "logout",
      href: "/logout",
      valid: dataUsuario !== null
    },
    {
      title: "Registrarse",
      slug: "register",
      href: "/register",
      valid: !dataUsuario
    },
    {
      title: "Iniciar sesión",
      slug: "login",
      href: "/login",
      valid: !dataUsuario
    }
  ]

  return (
    <ul
      className={`gap-4 flex font-semibold text-sm ${isOpen
        ? "absolute top-0 left-0 bottom-0 right-0 bg-white/90 backdrop-blur-sm z-40 flex-col items-center justify-center gap-8 pt-10 md:pt-0 md:gap-4 md:static md:flex md:flex-row md:bg-transparent"
        : "hidden md:flex"}`}
    
    >
      {
        menuItems.map((item, index) => {

          
          if (item.valid){
            return <MenuItem item={item} key={index} close={close} />
          }
        })
      }
      <a
        className="p-4 md:p-1 bg-green-500 rounded-full"
        href="/cart"
      >
        <CartIcon color="#000"/>
      </a>
    </ul>
  )
}

const MenuItem = ({ item, close } : { item: MenuItem, close: () => void }) => {
  const actualPath = useSelectedLayoutSegment() ?? ""
  const isSelected = item.slug === actualPath
  return (
    <Link className={`px-2 py-1  ${isSelected ? "bg-black text-white rounded-lg" : ""}`} href={item.href} onClick={() => close()}>{item.title}</Link>
  )
}