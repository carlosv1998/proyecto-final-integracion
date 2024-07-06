import { useRef } from "react";
import { AddProductsItemsType, InputType } from "../../types.d"
import { toast, Toaster } from "sonner";
import { FormAddProductsProps } from "../../types.d"
import { useRouter } from "next/navigation";



export const FormAddProducts = ({ producto, method, proveedores, marcas, sucursales, colores, categoriasPadres, categoriasHijas, categorias, cambiarCategoriaHija, cambiarCategoria }: FormAddProductsProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const addProductsItems: AddProductsItemsType[] = [
    {
      id: "nombre",
      text: "Nombre",
      type: InputType.text,
      element: "input",
      errorMessage: {
        required: 'El nombre es requerido',
        minLength: 'El nombre debe tener al menos 5 caracteres',
        invalid: 'El nombre debe contener solo letras'
      }
    },
    {
      id: "descripcion",
      text: "Descripción",
      type: InputType.text,
      element: "input",
      errorMessage: {
        required: 'La descripción es requerida',
        minLength: 'La descripción debe tener al menos 10 caracteres',
        invalid: 'La descripción debe contener solo letras'
      }
    },
    {
      id: "altoCm",
      text: "Alto (cm)",
      type: InputType.number,
      element: "input",
      errorMessage: {
        required: 'El alto es requerido',
        minLength: 'El alto debe tener al menos 1 caracter',
        invalid: 'El alto deben ser números'
      }
    },
    {
      id: "anchoCm",
      text: "Ancho (cm)",
      type: InputType.number,
      element: "input",
      errorMessage: {
        required: 'El ancho es requerido',
        minLength: 'El ancho debe tener al menos 1 caracter',
        invalid: 'El ancho deben ser números'
      }
    },
    {
      id: "descuento",
      text: "Descuento",
      type: InputType.number,
      element: "input",
      errorMessage: {
        required: 'El descuento es requerido',
        minLength: 'El descuento debe tener al menos 1 caracter',
        invalid: 'El descuento deben ser números'
      }
    },
    {
      id: "cantidad",
      text: "Cantidad",
      type: InputType.number,
      element: "input",
      errorMessage: {
        required: 'La cantidad es requerida',
        minLength: 'La cantidad debe tener al menos 1 caracter',
        invalid: 'La cantidad deben ser números'
      }
    },
    {
      id: "portada",
      text: "Portada",
      type: InputType.text,
      element: "input",
      errorMessage: {
        required: 'La portada es requerida',
        minLength: 'La portada debe tener al menos 10 caracteres',
        invalid: 'La portada debe contener solo letras'
      }
    },
    {
      id: "precio",
      text: "Precio",
      type: InputType.number,
      element: "input",
      errorMessage: {
        required: 'El precio es requerido',
        minLength: 'El precio debe tener al menos 1 caracter',
        invalid: 'El precio deben ser números'
      }
    }
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const completeData = {
      ...data,
      id: producto?.id,
      calificacion: producto?.calificacion || 0,
      cantidadCalificaciones: producto?.cantidadCalificaciones || 0
    };

    const res = await (fetch("/api/products", {
      method: method,
      body: JSON.stringify(completeData),
      headers: {
        "Content-Type": "application/json",
      },
    }))

    if (res.ok){
      formRef.current?.reset()
      router.push(method === "POST" ? "/management/add-products" : "/management/products-management")
      toast.success(method === "POST" ? "Producto agregado con éxito" : "Producto actualizado con éxito")
    }
  }

  return (
    <form className="w-full flex flex-col gap-2 max-w-[600px] shadow-2xl p-4 lg:p-8 h-full overflow-auto" onSubmit={handleSubmit} ref={formRef}>
      <label className="font-bold" htmlFor="proveedores">Proveedores</label>
      <select className="border border-gray-300 p-2 rounded-lg" name="proveedores" id="proveedores" required>
        {
          proveedores?.map((proveedor) => {
            if (producto?.proveedores.id === proveedor.id){
              return <option key={proveedor.id} value={proveedor.id} selected>{proveedor.nombre}</option>
            }else {
              return <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
            }
          }
            
          )
        }
      </select>
      <label className="font-bold" htmlFor="marcas">Marcas</label>
      <select className="border border-gray-300 p-2 rounded-lg" name="marcas" id="marcas" required>
        {
          marcas?.map((marca) =>{
            if (producto?.marcas.id === marca.id){
              return <option key={marca.id} value={marca.id} selected>{marca.nombre}</option>
            }else {
              return <option key={marca.id} value={marca.id}>{marca.nombre}</option>
            }
          }
            
          )
        }
      </select>
      <label className="font-bold" htmlFor="sucursales">Sucursales</label>
      <select className="border border-gray-300 p-2 rounded-lg" name="sucursales" id="sucursales" required>
        {
          sucursales?.map((sucursal) =>{
            if (producto?.sucursales.id === sucursal.id){
              return <option key={sucursal.id} value={sucursal.id} selected>{sucursal.nombre}</option>
            }else {
              return <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</option>
            }
          }
            
          )
        }
      </select>
      <label className="font-bold" htmlFor="colores">Colores</label>
      <select className="border border-gray-300 p-2 rounded-lg" name="colores" id="colores" required>
        {
          colores?.map((color) => {
            if (producto?.colores.id === color.id){
              return <option key={color.id} value={color.id} selected>{color.nombre}</option>
            }else {
              return <option key={color.id} value={color.id}>{color.nombre}</option>
            }
          }
            
          )
        }
      </select>
      <label className="font-bold" htmlFor="categorias">Categoría</label>
      <div className="w-full flex flex-col gap-2 lg:flex-row">
        <select className="w-full border border-gray-300 p-2 rounded-lg" name="categoriasPadres" id="categoriasPadres" onChange={cambiarCategoriaHija} required>
          {
            categoriasPadres?.map((categoriaPadre) => {
              if (producto?.categorias.categoriasHijas.categoriasPadres.id === categoriaPadre.id){
                return <option key={categoriaPadre.id} value={categoriaPadre.id} selected>{categoriaPadre.nombre}</option>
              }else {
                return <option key={categoriaPadre.id} value={categoriaPadre.id}>{categoriaPadre.nombre}</option>
              }
            }
            )
          }
        </select>
        <select className="w-full border border-gray-300 p-2 rounded-lg" name="categoriasHijas" id="categoriasHijas" onChange={cambiarCategoria} required>
          {
            categoriasHijas?.map((categoriaHija) => {
              if (producto?.categorias.categoriasHijas.id === categoriaHija.id){
                return <option key={categoriaHija.id} value={categoriaHija.id} selected>{categoriaHija.nombre}</option>
              }else {
                return <option key={categoriaHija.id} value={categoriaHija.id}>{categoriaHija.nombre}</option>
              }
            }
              
            )
          }
        </select>
        <select className="w-full border border-gray-300 p-2 rounded-lg" name="categorias" id="categorias" required>
          {
            categorias?.map((categoria) => {
              if (producto?.categorias.id === categoria.id){
                return <option key={categoria.id} value={categoria.id} selected>{categoria.nombre}</option>
              }else {
                return <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
              }
            }
              
            )
          }
        </select>
      </div>
      {
        addProductsItems.map((item) =>
          <InputAddProducts key={item.id} item={item} producto={producto} />
        )
      }
      <button className="p-2 bg-[#0171D3] text-white rounded-lg w-full mt-4" >Agregar</button>
      <Toaster />
    </form>
  )
}

const InputAddProducts = ({ item, producto }: { item: AddProductsItemsType, producto?: any | null }) => {

  return (
    <>
      <label className="font-bold" htmlFor={item.id}>{item.text}</label>
      {
        producto
        ? <input className="border border-gray-300 p-2 rounded-lg" defaultValue={producto[item.id]} type={item.type} name={item.id} id={item.id} required/>
        : <input className="border border-gray-300 p-2 rounded-lg" type={item.type} name={item.id} id={item.id} required/>
      }
    </>
  )
}