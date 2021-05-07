import React from "react";
import { Link } from "react-router-dom";
import useDishes from "../hooks/useDishes";
import DishDetail from "../components/dishes/molecules/DishDetail";
import * as ROUTES from "../constants/routes";

const Menu = () => {
  const { dishes } = useDishes("name");

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to={ROUTES.NEW_DISH}
        className="  bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Add Dish
      </Link>

      {dishes.map((dish) => (
        <DishDetail key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default Menu;
