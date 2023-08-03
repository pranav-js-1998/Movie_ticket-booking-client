import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import AuthService from "../../services/authService";
import { AuthStatus } from "../../context/context";


const Navbar = () => {
  const {authStatus} = useContext(AuthStatus)
  const {userName} = useContext(AuthStatus)

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const authService = new AuthService();
    const loggedIn = localStorage.getItem("accessToken") !== null;

    authService.loggedIn = loggedIn;

  }, []);

  const logout = () => {
    const authService = new AuthService();
    authService.logout();
    history.push("/");
  };

  return (
    <header className="navbar navbar-expand-lg fixed-top bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {/* <iframe
            title="BookMyShow Logo"
            src="https://giphy.com/embed/J3FXULkUyQqNva9Wcw"
            width="200"
            height="50"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          ></iframe> */}
          TicketsNew.com
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <nav className="collapse navbar-collapse" id="navbarCollapse2">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Movies Streaming Now
              </Link>
            </li>
          </ul>
          {!authStatus && (
            <>
              <Link
                to="/login"
                className="btn btn-outline-primary btn-sm fs-sm d-lg-none ms-3 mb-4 mb-lg-0"
              >
                <i className="ai-login me-2 ms-n1"></i>
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm fs-sm d-lg-none ms-3 mb-4 mb-lg-0"
              >
                <i className="ai-login me-2 ms-n1"></i>
                Sign up
              </Link>
            </>
          )}
          {authStatus && (
            <>
              <p className="navbar-brand m-0 p-0 me-2 text-info">
                Hi, {userName}
              </p>
              <button
                onClick={logout}
                className="btn btn-outline-primary btn-sm d-lg-none"
              >
                <i className="ai-login me-2 ms-n1"></i>
                Logout
              </button>
            </>
          )}
        </nav>
        {!authStatus && (
          <>
            <Link
              to="/login"
              className="btn btn-outline-primary btn-sm me-2 d-none d-lg-inline-flex"
            >
              <i className="ai-login me-2 ms-n1"></i>
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm d-none d-lg-inline-flex"
            >
              <i className="ai-login me-2 ms-n1"></i>
              Sign up
            </Link>
          </>
        )}
        {authStatus && (
          <button
            onClick={logout}
            className="btn btn-outline-primary btn-sm d-none d-lg-inline-flex"
          >
            <i className="ai-login me-2 ms-n1"></i>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
