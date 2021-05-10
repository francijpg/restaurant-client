import React, { useEffect } from "react";
import Title from "../components/common/Title";
import FormRegisterDish from "../components/dishes/molecules/FormRegisterDish";

const NewDish = () => {
  useEffect(() => {
    document.title = "New Dish - RestaurantApp";
  }, []);

  return (
    <>
      <Title>new dish</Title>
      <FormRegisterDish />
    </>
  );
};

export default NewDish;
