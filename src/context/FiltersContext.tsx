"use client"
import { createContext, useState } from 'react';

type FiltersType = {
  minprice: number;
  maxprice: number;
  categoria: string;
  marca: string;
};

interface FiltersContextType {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
}

export const FiltersContext = createContext<undefined | FiltersContextType>(undefined);

export function FiltersContextProvider({children}: {children: React.ReactNode;}) {
  const [filters, setFilters] = useState<FiltersType>({
    minprice: 0,
    maxprice: 1000000,
    categoria: "all",
    marca: "all"
  });

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  );
}