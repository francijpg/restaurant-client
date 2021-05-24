import React, { useEffect } from "react";
import Title from "../components/common/Title";
import FormRegisterDish from "../components/dishes/molecules/FormRegisterDish";
import Sidebar from "../components/layout/Sidebar";

const NewDish = () => {
  useEffect(() => {
    document.title = "New Dish - RestaurantApp";
  }, []);

  return (
    <>
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-2/5 xl:w-4/5 p-6">
          <Title>new dish</Title>
          <FormRegisterDish />
        </div>
      </div>
    </>
  );
};

export default NewDish;
