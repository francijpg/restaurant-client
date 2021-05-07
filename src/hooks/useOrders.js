import { useEffect, useRef, useState } from "react";
import { useStorage } from "../contexts/StorageContext";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const { getOrders } = useStorage();
  const isMounted = useRef(true);

  useEffect(() => {
    getOrders(handleSnapshot);
    return () => {
      isMounted.current = false;
    };
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
