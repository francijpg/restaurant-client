import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const Sidebar = () => {
  const currentLocation = useLocation().pathname;
  const locations = [
    { to: ROUTES.DASHBOARD, name: "Orders" },
    { to: ROUTES.DISHES_MENU, name: "Menu" },
  ];

  return (
    <div className="md:w-2/6 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          Restaurant App
        </p>

        <p className="mt-3 text-gray-600">
          Manage your restaurant with the following options:
        </p>

        <nav className="mt-10">
          {locations.map((value, index) => (
            <NavLink
              className={`p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900 ${
                value.to === currentLocation ? "text-yellow-400" : null
              }`}
              key={index}
              to={value.to}
            >
              {value.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
