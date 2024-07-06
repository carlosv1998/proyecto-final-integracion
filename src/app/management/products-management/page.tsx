import { ShowProductsManagement } from "@/components/ShowProductsManagement"
import { Search } from "@/components/Search"
import { SectionContainer } from "@/components/SectionContainer"
import { Suspense } from "react"
import { Filters } from "@/components/Filters"

export default function ProductsManagementPage({ searchParams } : { searchParams?: { search?: string, page?: string } }) {
  const currentPage = Number(searchParams?.page || 1)
  const search = searchParams?.search ?? "$%7Bsearch%7D"

  return (
    <SectionContainer>
      <div className="flex h-full flex-col gap-4 lg:flex-row w-full">
        <Filters />
        <div className="flex flex-col items-center gap-2 w-full h-full">
          <Search />
          <div className="flex flex-col items-center gap-5 w-full h-full overflow-auto pb-20">
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
              <Suspense
                key={search}
                fallback={<div>Cargando...</div>}
              >
                <ShowProductsManagement search={search} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

