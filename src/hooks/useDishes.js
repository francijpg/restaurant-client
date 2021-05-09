import { useEffect, useState } from "react";
import { useStorage } from "../contexts/StorageContext";

const useDishes = (order) => {
  const [dishes, setDishes] = useState([]);
  const { getDishes } = useStorage();

  useEffect(() => {
    const listener = getDishes(order, handleSnapshot);
    return () => listener();
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
