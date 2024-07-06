"use client"
import { SearchIcon } from "@/icons/MenuIcons"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"


export const Search = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term){
      params.set("search", term)
    }else {
      params.delete("search")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="flex items-center gap-2 w-full border border-gray-300 px-2 rounded-lg max-w-[800px]">
      <input
        type="text"
        className="w-full p-2 rounded-lg outline-none " placeholder="Buscar producto..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <SearchIcon />
    </div>
  )
}