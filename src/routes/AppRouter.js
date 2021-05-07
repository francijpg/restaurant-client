import { Routes, Route } from "react-router";

import * as ROUTES from "../constants/routes";

import Sidebar from "../components/layout/Sidebar";

import Orders from "../views/orders";
import Menu from "../views/menu";
import NewDish from "../views/new-dish";
import NotFound from "../views/not-found";

import StorageContext from "../contexts/StorageContext";

function AppRouter() {
  return (
    <StorageContext>
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-2/5 xl:w-4/5 p-6">
          <Routes>
            <Route path={ROUTES.DASHBOARD} element={<Orders />} />
            <Route path={ROUTES.DISHES_MENU} element={<Menu />} />
            <Route path={ROUTES.NEW_DISH} element={<NewDish />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </StorageContext>
  );
}

export default AppRouter;
