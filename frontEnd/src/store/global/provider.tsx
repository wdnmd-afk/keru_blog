// StoreContext.tsx
import React, { createContext, ReactNode } from "react";
import { GlobalStore } from "./index";

interface StoreContextType {
  GlobalStore: GlobalStore;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const GlobalStoreProvider = ({ children }: StoreProviderProps) => {
  const store = new GlobalStore();

  return (
    <StoreContext.Provider value={{ GlobalStore: store }}>
      {children}
    </StoreContext.Provider>
  );
};
