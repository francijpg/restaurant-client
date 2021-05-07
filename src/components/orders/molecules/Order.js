import React, { useState } from "react";
import { useStorage } from "../../../contexts/StorageContext";
import * as ORDERS from "../../../constants/orders";

const Order = ({ order }) => {
  const [deliveryTime, setDeliveryTime] = useState(0);
  const { setOrderTime, setOrderCompleted } = useStorage();

  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold"> {order.id} </h1>
        {order.order.map((dishes) => (
          <p className="text-gray-600">
            {dishes.amount} {dishes.name}
          </p>
        ))}
        <p className="text-gray-700 font-bold">Total to Pay: $ {order.total}</p>

        {order.deliveryTime === 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Delivery Time
            </label>

            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={ORDERS.DELIVERY_TIME_MIN}
              max={ORDERS.DELIVERY_TIME_MAX}
              placeholder={ORDERS.DELIVERY_TIME_MAX}
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(parseInt(e.target.value))}
            />

            <button
              onClick={() => setOrderTime(order.id, deliveryTime)}
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            >
              Define Time
            </button>
          </div>
        )}

        {order.deliveryTime > 0 && (
          <p className="text-gray-700">
            Delivery Time:
            <span className="font-bold"> {order.deliveryTime} Minutes</span>
          </p>
        )}

        {!order.completed && order.deliveryTime > 0 && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => setOrderCompleted(order.id)}
          >
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
