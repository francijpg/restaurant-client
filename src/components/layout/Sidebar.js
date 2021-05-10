import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Sidebar = () => {
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
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            activeClassName="text-yellow-500"
            end
            to={ROUTES.DASHBOARD}
          >
            Orders
          </NavLink>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            activeClassName="text-yellow-500"
            end
            to={ROUTES.DISHES_MENU}
          >
            Menu
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
