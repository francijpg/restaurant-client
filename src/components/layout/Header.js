import React from "react";
import { Link, useHistory } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import * as ICONS from "../../constants/icons";
import { useAuth } from "../../contexts/AuthContext";
// import useUser from "../../hooks/useUser";

const Header = () => {
  const { currentUser, setLogOut } = useAuth();
  // const { user } = useUser(currentUser?.uid);
  const history = useHistory();
  const profileImg = currentUser?.displayName.toLowerCase();

  return (
    <header className="h-16 bg-white border-b border-gray-primary">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="RestaurantApp logo">
                {ICONS.HOME}
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {currentUser ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  {ICONS.HOME}
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    setLogOut();
                    history.push(ROUTES.LOGIN);
                  }}
                >
                  {ICONS.LOG_OUT}
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${profileImg}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${profileImg}.jpg`}
                      alt={`${profileImg} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
