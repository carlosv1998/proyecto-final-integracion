export enum InputType {
  text = "text",
  email = "email",
  date = "date",
  tel = "tel",
  password = "password",
  number = "number"
}

export enum InputId {
  nombre = "nombre",
  apellidoP = "apellidoP",
  apellidoM = "apellidoM",
  fechaNacimiento = "fechaNacimiento",
  correo = "correo",
  rut = "rut",
  telefono = "telefono",
  contra = "contra",
  confirmarContra = "confirmarContra"
}

export interface Usuario {
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  fechaNacimiento: Date;
  email: string;
  rut: string;
  telefono: string;
  contraHash: string;
  idRol: number;
}

export type DataUsuario = {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

type proveedoresType = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  paginaWeb: string;
  cuentaBancaria: string;
}

type marcasType = {
  id: number;
  nombre: string;
}

type sucursalesType = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaApertura: Date;
  horaApertura: Date;
  horaCierre: Date;
}

type categoriasPadresType = {
  id: number;
  nombre: string;
}

type categoriasHijasType = {
  id: number;
  idCategoriaPadre: number;
  nombre: string;
  categoriasPadres: categoriasPadresType;
}

type categoriasType = {
  id: number;
  idCategoriaHija: number;
  nombre: string;
  categoriasHijas: categoriasHijasType;
}

type coloresType = {
  id: number;
  nombre: string;
}

export type ProductsType = {
  id: number;
  nombre: string;
  descripcion: string;
  altoCm: number;
  anchoCm: number;
  descuento: number;
  calificacion: number;
  cantidadCalificaciones: number;
  cantidad: number;
  portada: string;
  precio: number;
  proveedores: proveedoresType;
  marcas: marcasType;
  sucursales: sucursalesType;
  categorias: categoriasType;
  colores: coloresType;
}

export type AddProductsItemsType = {
  id: string;
  text: string;
  type: InputType;
  element: string;
  errorMessage: {
    required: string;
    minLength: string;
    invalid: string;
  }
}

export type ProductAddType = {
  nombre: string;
  descripcion: string;
  altoCm: string;
  anchoCm: string;
  descuento: string;
  cantidad: string;
  portada: string;
  precio: string;
  proveedores: string;
  marcas: string;
  sucursales: string;
  categorias: string;
  colores: string;
}

export type ProductsCartType = {
  id: number;
  nombre: string;
  descripcion: string;
  altoCm: number;
  anchoCm: number;
  descuento: number;
  calificacion: number;
  cantidadCalificaciones: number;
  cantidad: number;
  portada: string;
  precio: number;
  proveedores: proveedoresType;
  marcas: marcasType;
  sucursales: sucursalesType;
  categorias: categoriasType;
  colores: coloresType;
  cantidadCarro?: number;
}

export interface FormAddProductsProps {
  producto: ProductsType | null;
  method: string;
  proveedores: proveedoresType[] | null;
  marcas: marcasType[] | null;
  sucursales: sucursalesType[] | null;
  colores: coloresType[] | null;
  categoriasPadres: categoriasPadresType[] | null;
  categoriasHijas: categoriasHijasType[] | null;
  categorias: categoriasType[] | null;
  cambiarCategoriaHija: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cambiarCategoria: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type ProductUpdateType = {
  id: string;
  nombre: string;
  descripcion: string;
  altoCm: string;
  anchoCm: string;
  descuento: string;
  cantidad: string;
  portada: string;
  precio: string;
  proveedores: string;
  marcas: string;
  sucursales: string;
  categorias: string;
  colores: string;
  calificacion: string;
  cantidadCalificaciones: string;
}