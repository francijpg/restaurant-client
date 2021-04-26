import { createContext, useContext } from "react";
import services from "../services";

const { database, storage, firebaseApp } = services;

export const StorageContext = createContext();

export function useStorage() {
  return useContext(StorageContext);
}

function StorageProvider({ children }) {
  function setProduct(product) {
    database.products.add(product);
  }

  function setStorageDirectory() {
    return storage.ref("products");
  }

  async function setImageUrl(fileName) {
    // console.log(fileName);
    // const storageRef = storage.ref()
    // const fileRef = await storageRef.child(fileName);
    // const downloadUrl = await fileRef.getDownloadURL();
    // return downloadUrl;
    // const x = await storageRef.child(`products`).child(fileName);
    return await storage.ref("products").child(fileName).getDownloadURL();
    // console.log(x);
    // await storage
    //   .ref()
    //   .child("products")
    //   .child(fileName)
    //   .getDownloadURL();

    // const url = await firebaseApp.storage.ref()
    //   .child("products")
    //   .child(name)
    //   .getDownloadURL();
  }

  const value = {
    firebaseApp,
    storage,
    setProduct,
    setStorageDirectory,
    setImageUrl,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}

export default StorageProvider;
