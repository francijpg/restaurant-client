import React from "react";
import Order from "../components/orders/molecules/Order";
import useOrders from "../hooks/useOrders";

const Orders = () => {
  const { orders } = useOrders;
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Orders</h1>
      <div className="sm:flex sm:flex-wrap -mx-3">
        {!!orders &&
          orders.map((order) => <Order key={order.id} order={order} />)}
      </div>
    </>
  );
};

export default Orders;
