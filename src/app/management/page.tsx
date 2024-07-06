import Link from "next/link";


export default function ManagementPage() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <Link className="p-4 bg-black text-white rounded-lg" href="/management/products-management">Administrar productos</Link>
        <Link className="p-4 bg-black text-white rounded-lg" href="/management/add-products">Agregar producto</Link>
      </div>
    </section>
  )
}