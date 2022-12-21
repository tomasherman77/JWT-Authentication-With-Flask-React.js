import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <div>
              <Link to="/login">
                <button className="btn btn-primary mx-2">LOG IN</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-secondary mx-2">SIGN UP</button>
              </Link>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => actions.logout()}
            >
              LOG OUT
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
