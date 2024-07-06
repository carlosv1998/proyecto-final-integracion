import { FiltersContext } from "@/context/FiltersContext"
import { useContext } from "react"

export const useFilters = () => {
  const context = useContext(FiltersContext)

  if (!context){
    throw new Error("useFilters must be used within a FiltersContextProvider")
  }

  const { filters, setFilters } = context

  return { filters, setFilters }
}