import React, { useEffect } from "react";
import Title from "../components/common/Title";
import Order from "../components/orders/molecules/Order";
import { useAuth } from "../contexts/AuthContext";
import { useStorage } from "../contexts/StorageContext";
import useOrders from "../hooks/useOrders";

const Orders = () => {
  const { orders } = useOrders();
  const { storageError, setStorageError } = useStorage();
  const { needVerification } = useAuth();

  useEffect(() => {
    document.title = "Orders - RestaurantApp";
    setStorageError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title>orders</Title>
      {needVerification && <p>Please verify your email address.</p>}
      {storageError && (
        <p className="mb-4 text-xs text-red-primary">{storageError}</p>
      )}
      <div className="sm:flex sm:flex-wrap -mx-3">
        {!!orders &&
          orders.map((order) => <Order key={order.id} order={order} />)}
      </div>
    </>
  );
};

export default Orders;
