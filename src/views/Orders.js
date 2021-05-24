import React, { useEffect } from "react";
import Title from "../components/common/Title";
import Sidebar from "../components/layout/Sidebar";
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
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-2/5 xl:w-4/5 p-6">
          <Title>orders</Title>
          {needVerification && <p>Please verify your email address.</p>}
          {storageError && (
            <p className="mb-4 text-xs text-red-primary">{storageError}</p>
          )}
          <div className="sm:flex sm:flex-wrap -mx-3">
            {!!orders &&
              orders.map((order) => <Order key={order.id} order={order} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
