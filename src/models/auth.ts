import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { ProductAddType, ProductsType, ProductUpdateType, Usuario } from "../../types";
import jwt from "jsonwebtoken";
import { variables } from "../../const";


export class Usuarios {

  static async hashearContra(contra: string) {
    return bcrypt.hashSync(contra, 10)
  }

  static async verificarContra({contra, email}: { contra: string, email: string }) {
    const usuario = await prisma.usuarios.findFirst({
      where: {
        email: email
      }
    })

    if (usuario){
      const isValid = await bcrypt.compare(contra, usuario.contraHash)
      if (isValid){
        const { contraHash: _, ...datosUsuario} = usuario
        return datosUsuario
      }
    }
    return null
  }

  static async verificarCorreo(correo: string) {
    const usuario = await prisma.usuarios.findFirst({
      where: {
        email: correo
      }
    })
    return usuario
  }

  static async verificarRut(rut: string) {
    const usuario = await prisma.usuarios.findFirst({
      where: {
        rut: rut
      }
    })
    return usuario
  }

  static async crearUsuario(usuario: Usuario) {
    const usu = await prisma.usuarios.create({
      data: usuario
    })
    return usu
  }

  static async generarToken({ id, email, nombre, idRol }: { id: number, email: string, nombre: string, idRol: number} ) {
    const rol = idRol === 1 ? "admin" : "user"
    const token = jwt.sign({
      id: id,
      email: email,
      nombre: nombre,
      rol: rol
    }, variables.JWT_SECRET, {
      expiresIn: "30d"
    })
    return token
  }
}

export class Roles {

  static async obtenerRoles(){
    const roles = await prisma.roles.findMany()
    return roles
  }

  static async obtenerRol(nombre: string) {
    const rol = await prisma.roles.findFirst({
      where: {
        nombre
      }
    })
    return rol
  }
}

export class Productos {
  static async obtenerProductos({search}: { search: string }) {

    const productos = await prisma.productos.findMany({
      where: {
        OR: [
          {
            nombre: {
              contains: search.trim()
            }
          }
        ]
      },
      include: {
        proveedores: true,
        marcas: true,  
        sucursales: true, 
        categorias: {
          select: {
            id: true,
            idCategoriaHija: true,
            nombre: true,
            categoriasHijas: {
              select: {
                id: true,
                idCategoriaPadre: true,
                nombre: true,
                categoriasPadres: {
                  select: {
                    id: true,
                    nombre: true
                  }
                }
              }
            }
          }
        },  
        colores: true,
      },
    })
    return productos
  }

  static async obtenerProductoPorId(id: number){
    const producto = await prisma.productos.findFirst({
      where: {
        id
      },
      include: {
        proveedores: true,
        marcas: true,  
        sucursales: true, 
        categorias: {
          select: {
            id: true,
            idCategoriaHija: true,
            nombre: true,
            categoriasHijas: {
              select: {
                id: true,
                idCategoriaPadre: true,
                nombre: true,
                categoriasPadres: {
                  select: {
                    id: true,
                    nombre: true
                  }
                }
              }
            }
          }
        },  
        colores: true,
      },
    })
    return producto
  }

  static async agregarProducto(producto: ProductAddType) {
    const productoAgregado = await prisma.productos.create({
      data: {
        idProveedor: parseInt(producto.proveedores),
        idMarca: parseInt(producto.marcas),
        idSucursal: parseInt(producto.sucursales),
        idCategoria: parseInt(producto.categorias),
        idColor: parseInt(producto.colores),
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        altoCm: parseFloat(producto.altoCm),
        anchoCm: parseFloat(producto.anchoCm),
        descuento: parseInt(producto.descuento),
        calificacion: 0,
        cantidadCalificaciones: 0,
        cantidad: parseInt(producto.cantidad),
        portada: producto.portada,
        precio: parseInt(producto.precio),
      }
    })
    return productoAgregado.id
  }

  static async editarProducto(producto: ProductUpdateType) {
    const data: any = {};

    if (producto.proveedores !== undefined) {
        data.idProveedor = parseInt(producto.proveedores);
    }
    if (producto.marcas !== undefined) {
        data.idMarca = parseInt(producto.marcas);
    }
    if (producto.sucursales !== undefined) {
        data.idSucursal = parseInt(producto.sucursales);
    }
    if (producto.categorias !== undefined) {
        data.idCategoria = parseInt(producto.categorias);
    }
    if (producto.colores !== undefined) {
        data.idColor = parseInt(producto.colores);
    }
    if (producto.nombre !== undefined) {
        data.nombre = producto.nombre;
    }
    if (producto.descripcion !== undefined) {
        data.descripcion = producto.descripcion;
    }
    if (producto.altoCm !== undefined) {
        data.altoCm = parseFloat(producto.altoCm);
    }
    if (producto.anchoCm !== undefined) {
        data.anchoCm = parseFloat(producto.anchoCm);
    }
    if (producto.descuento !== undefined) {
        data.descuento = parseInt(producto.descuento);
    }
    // Calificación y cantidad de calificaciones no se actualizan si no están presentes en el objeto
    if (producto.calificacion !== undefined) {
        data.calificacion = parseInt(producto.calificacion);
    }
    if (producto.cantidadCalificaciones !== undefined) {
        data.cantidadCalificaciones = parseInt(producto.cantidadCalificaciones);
    }
    if (producto.cantidad !== undefined) {
        data.cantidad = parseInt(producto.cantidad);
    }
    if (producto.portada !== undefined) {
        data.portada = producto.portada;
    }
    if (producto.precio !== undefined) {
        data.precio = parseInt(producto.precio);
    }

    // Realizar la actualización con Prisma
    const productoAgregado = await prisma.productos.update({
        data,
        where: {
            id: parseInt(producto.id)
        }
    });

    return productoAgregado.id;
  }

  static async eliminarProducto(id: number) {
    const productoEliminado = await prisma.productos.delete({
        where: {
            id
        }
    });

    return productoEliminado.id;
  }
}

export class Proveedores {
  static async obtenerProveedores() {
    const proveedores = await prisma.proveedores.findMany()
    return proveedores
  }

  static async obtenerProveedorPorId(id: number){
    const proveedor = await prisma.proveedores.findFirst({
      where: {
        id
      }
    })

    return proveedor
  }
}

export class Marcas {
  static async obtenerMarcas(){
    const marcas = await prisma.marcas.findMany()
    return marcas
  }

  static async obtenerMarcaPorId(id: number){
    const marca = await prisma.marcas.findFirst({
      where: {
        id
      }
    })

    return marca
  }
}

export class Sucursales {
  static async obtenerSucursales(){
    const sucursales = await prisma.sucursales.findMany()
    return sucursales
  }

  static async obtenerSucursalPorId(id: number){
    const sucursal = await prisma.sucursales.findFirst({
      where: {
        id
      }
    })

    return sucursal
  }
}

export class Categorias {
  static async obtenerCategorias(){
    const categorias = await prisma.categorias.findMany()
    return categorias
  }

  static async obtenerCategoriaPorId(id: number){
    const categoria = await prisma.categorias.findFirst({
      where: {
        id
      }
    })

    return categoria
  }
}

export class Colores {
  static async obtenerColores(){
    const colores = await prisma.colores.findMany()
    return colores
  }

  static async obtenerColorPorId(id: number){
    const color = await prisma.colores.findFirst({
      where: {
        id
      }
    })

    return color
  }
}

export class CategoriasPadres {
  static async obtenerCategoriasPadres(){
    const categoriasPadres = await prisma.categoriasPadres.findMany()
    return categoriasPadres
  }

  static async obtenerCategoriaPadrePorId(id: number){
    const categoriaPadre = await prisma.categoriasPadres.findFirst({
      where: {
        id
      }
    })
    return categoriaPadre
  }
}

export class CategoriasHijas {
  static async obtenerCategoriasHijas(){
    const categoriasHijas = await prisma.categoriasHijas.findMany()
    return categoriasHijas
  }

  static async obtenerCategoriaHijaPorId(id: number){
    const categoriaHija = await prisma.categoriasHijas.findFirst({
      where: {
        id
      }
    })
    return categoriaHija
  }
}