import { createContext, useContext, useState } from "react";
import services from "../services";

const { database, storage } = services;

export const StorageContext = createContext();

export function useStorage() {
  return useContext(StorageContext);
}

function StorageProvider({ children }) {
  const [dishImageUrl, setDishImageUrl] = useState("");

  const setProduct = async (dish) => {
    return await database.products.add(dish);
  };

  const setStorageDirectory = () => {
    return storage.ref("products");
  };

  const setImageUrl = async (fileName) => {
    const storageRef = storage.ref("products");
    const imageUrl = await storageRef.child(fileName).getDownloadURL();
    setDishImageUrl(imageUrl)
  };

  const setDishAvailability = async (dishId, stockRef) => {
    const stock = stockRef.current.value === "true";
    try {
      await database.products.doc(dishId).update({
        stock,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDishes = (order, handleSnapshot) => {
    return database.products.orderBy(order, "desc").onSnapshot(handleSnapshot);
  };

  const value = {
    dishImageUrl,
    setProduct,
    setStorageDirectory,
    setImageUrl,
    setDishAvailability,
    getDishes,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}

export default StorageProvider;
