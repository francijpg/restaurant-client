import { useEffect, useRef, useState } from "react";
import { useStorage } from "../contexts/StorageContext";

const useDishes = (order) => {
  const [dishes, setDishes] = useState([]);
  const { getDishes } = useStorage();
  const isMounted = useRef(true);

  useEffect(() => {
    getDishes(order, handleSnapshot);
    return () => {
      isMounted.current = false;
    };
  }, [getDishes, order]);

  function handleSnapshot(snapshot) {
    const dishesList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setDishes(dishesList);
  }
  return {
    dishes,
  };
};

export default useDishes;
