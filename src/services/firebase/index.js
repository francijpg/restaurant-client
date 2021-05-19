import app from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

import firebaseConfig from "./config";

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

export const firebaseApp = app;
export const firestore = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export const database = {
  products: firestore.collection("products"),
  orders: firestore.collection("orders"),
  users: firestore.collection("users"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
};
