import React, { useEffect } from "react";
import Title from "../components/common/Title";
import Order from "../components/orders/molecules/Order";
import useOrders from "../hooks/useOrders";

const Orders = () => {
  const { orders } = useOrders;

  useEffect(() => {
    document.title = "Orders - RestaurantApp";
  }, []);

  return (
    <>
      <Title>orders</Title>
      <div className="sm:flex sm:flex-wrap -mx-3">
        {!!orders &&
          orders.map((order) => <Order key={order.id} order={order} />)}
      </div>
    </>
  );
};

export default Orders;
