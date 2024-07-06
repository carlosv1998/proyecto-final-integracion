"use client"
import { createContext, useContext, useState } from 'react';
import { ProductsCartType } from '../../types';


interface CartContextType {
  cart: [] |ProductsCartType[];
  setCart: React.Dispatch<React.SetStateAction<ProductsCartType[] | []>>;
}

export const CartContext = createContext<undefined | CartContextType>(undefined);

export function CartContextProvider({children}: {children: React.ReactNode}) {
  const [cart, setCart] = useState<[] | ProductsCartType[]>([]);

  return (
    <CartContext.Provider value={{
      cart,
      setCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext) as CartContextType;
}
