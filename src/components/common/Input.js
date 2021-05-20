import React from "react";

const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type={type}
      placeholder={placeholder}
      value={value}
      id={id}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;
