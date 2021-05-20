import React from "react";

const FormErrorMessage = ({ message }) => {
  return (
    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
      <p>{message}</p>
    </div>
  );
};

export default FormErrorMessage;
