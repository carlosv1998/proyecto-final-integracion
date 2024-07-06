"use client"
import { createContext, useState } from 'react';
import { DataUsuario } from '../../types';


interface UserContextType {
  dataUsuario: null | DataUsuario;
  setDataUsuario: React.Dispatch<React.SetStateAction<DataUsuario | null>>;
}

export const ContextoUsuario = createContext<undefined | UserContextType>(undefined);

export function UserContextProvider({children}: {children: React.ReactNode}) {
  const [dataUsuario, setDataUsuario] = useState<null | DataUsuario>(null);

  return (
    <ContextoUsuario.Provider value={{
      dataUsuario,
      setDataUsuario
    }}>
      {children}
    </ContextoUsuario.Provider>
  );
}