import React, { useEffect } from "react";

import Title from "../components/common/Title";
import Link from "../components/common/Link";
import DishDetail from "../components/dishes/molecules/DishDetail";

import * as ROUTES from "../constants/routes";

import useDishes from "../hooks/useDishes";
import { useStorage } from "../contexts/StorageContext";
import Sidebar from "../components/layout/Sidebar";

const Menu = () => {
  const { dishes } = useDishes("name");
  const { storageError, setStorageError } = useStorage();

  useEffect(() => {
    document.title = "Menu - RestaurantApp";
    setStorageError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-2/5 xl:w-4/5 p-6">
          <Title>menu</Title>
          {storageError && (
            <p className="mb-4 text-xs text-red-primary">{storageError}</p>
          )}
          <Link route={ROUTES.NEW_DISH}>add dish</Link>
          {dishes &&
            dishes.map((dish) => <DishDetail key={dish.id} dish={dish} />)}
        </div>
      </div>
    </>
  );
};

export default Menu;
