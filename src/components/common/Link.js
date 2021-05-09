import React from "react";
import { Link as LinkContent } from "react-router-dom";

const Link = ({ route, children }) => {
  return (
    <LinkContent
      to={route}
      className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
    >
      {children}
    </LinkContent>
  );
};

export default Link;
