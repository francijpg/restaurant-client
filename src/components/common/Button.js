import React from "react";

const Button = ({
  type = "button",
  color = "bg-gray-800 hover:bg-gray-900",
  onClick,
  children,
}) => {
  return (
    <button
      className={`w-full mt-5 p-2 text-white uppercase font-bold ${color}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
