import { createContext, useContext } from "react";
import services from "../services";

const { firebaseApp, database } = services;

export const StorageContext = createContext();

export function useStorage() {
  return useContext(StorageContext);
}

function StorageProvider({ children }) {
  const printService = () => {
    console.log(firebaseApp);
  };

  const listService = () => {
    console.log(database.orders);
  };

  const listServiceTwo = (id) => {
    console.log(database.orders.doc(id));
  };

  const value = {
    printService,
    listService,
    listServiceTwo,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}

export default StorageProvider;
