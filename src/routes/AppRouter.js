import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Sidebar from "../components/layout/Sidebar";

import Orders from "../views/orders";
import Menu from "../views/menu";
import NewDish from "../views/new-dish";
import NotFound from "../views/not-found";
import LogIn from "../views/log-in";
import SignUp from "../views/sign-up";

import { StorageProvider } from "../contexts/StorageContext";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/layout/Header";

function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <StorageProvider>
        <Header />
          <div className="md:flex min-h-screen">
            <Sidebar />
            <div className="md:w-2/5 xl:w-4/5 p-6">
              <Switch>
                <Route path={ROUTES.SIGN_UP} component={SignUp} />
                <Route path={ROUTES.LOGIN} component={LogIn} />
                <PrivateRoute exact path={ROUTES.DASHBOARD} component={Orders} />
                <Route path={ROUTES.DISHES_MENU} component={Menu} />
                <Route path={ROUTES.NEW_DISH} component={NewDish} />
                <Route path={ROUTES.NOT_FOUND} component={NotFound} />
              </Switch>
            </div>
          </div>
        </StorageProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
