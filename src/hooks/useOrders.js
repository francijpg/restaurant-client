import { useEffect, useState } from "react";
import { useStorage } from "../contexts/StorageContext";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const { getOrders } = useStorage();

  useEffect(() => {
    const listener = getOrders(handleSnapshot);
    return () => listener();
  }, [getOrders]);

  function handleSnapshot(snapshot) {
    const ordersList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setOrders(ordersList);
  }

  return { orders };
};

export default useOrders;
