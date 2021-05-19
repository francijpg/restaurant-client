import React from "react";

const Title = ({ align = "left", children }) => {
  return (
    <h1 className="text-3xl font-light mb-4 capitalize" align={align}>
      {children}
    </h1>
  );
};

export default Title;
