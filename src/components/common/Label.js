import React from "react";

const Label = ({ htmlFor, children }) => {
  return (
    <label
      className="block text-black text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
