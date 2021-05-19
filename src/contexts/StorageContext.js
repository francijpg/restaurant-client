import { createContext, useContext, useState } from "react";
import services from "../services";
import * as MESSAGES from "../constants/providers";

const { database, storage } = services;

export const StorageContext = createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const [dishImageUrl, setDishImageUrl] = useState("");
  const [storageError, setStorageError] = useState("");

  const setProduct = async (dish) => await database.products.add(dish);

  const setStorageDirectory = () => {
    return storage.ref("products");
  };

  const setImageUrl = async (fileName) => {
    const storageRef = storage.ref("products");
    const imageUrl = await storageRef.child(fileName).getDownloadURL();
    setDishImageUrl(imageUrl);
  };

  const setDishAvailability = async (dishId, stockRef) => {
    const stock = stockRef.current.value === "true";
    try {
      await database.products.doc(dishId).update({
        stock,
      });
    } catch (error) {
      setStorageError(MESSAGES.STORAGE_MESSAGE_ERROR);
    }
  };

  const getDishes = (order, handleSnapshot) => {
    try {
      const dishes = database.products
        .orderBy(order, "desc")
        .onSnapshot(handleSnapshot);
      return dishes;
    } catch (error) {
      // console.log(error.message)
      setStorageError(MESSAGES.STORAGE_MESSAGE_ERROR);
    }
  };

  const getOrders = (handleSnapshot) => {
    try {
      const orders = database.orders
        .where("completed", "==", false)
        .onSnapshot(handleSnapshot);
      return orders;
    } catch (error) {
      // console.log(error.message)
      setStorageError(MESSAGES.STORAGE_MESSAGE_ERROR);
    }
  };

  const setOrderTime = async (id, deliveryTime) => {
    const time = await database.orders.doc(id).update({
      deliveryTime,
    });
    return time;
  };

  const setOrderCompleted = async (id) => {
    const status = await database.orders.doc(id).update({
      completed: true,
    });
    return status;
  };

  const value = {
    dishImageUrl,
    storageError,
    setStorageError,
    setProduct,
    setStorageDirectory,
    setImageUrl,
    setDishAvailability,
    getDishes,
    getOrders,
    setOrderTime,
    setOrderCompleted,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}