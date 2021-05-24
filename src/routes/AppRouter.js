import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";

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
          <Switch>
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.LOGIN} component={LogIn} />
            <PrivateRoute exact path={ROUTES.DASHBOARD} component={Orders} />
            <PrivateRoute exact path={ROUTES.DISHES_MENU} component={Menu} />
            <PrivateRoute exact path={ROUTES.NEW_DISH} component={NewDish} />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
          </Switch>
        </StorageProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
