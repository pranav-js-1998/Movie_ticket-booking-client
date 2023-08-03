import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/authService";
import { AuthStatus } from "../../context/context";

const Login = () => {
  const [username, setUsername] = useState("");
  const { userName, setUserName } = useContext(AuthStatus);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const authService = new AuthService();
  const history = useHistory();
  const { setAuthStatus } = useContext(AuthStatus);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(true);

    authService
      .login({ username, password })
      .then((response) => {
        if (response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("username", response.username);
          setUsername("");
          setPassword("");
          setUserName(response.username);
          setLoading(false);
          authService.loggedIn = true;
          setAuthStatus(true);
          authService.token = response.access;
          history.push("/");
        } else {
          setError(response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <section id="login">
      <div className="container">
        <div className="row min-vh-100 d-flex justify-content-center align-items-center">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src="https://d33wubrfki0l68.cloudfront.net/3ec9ba4912f9c709dc372e44996e05e983962a26/54f2f/assets/images/illustrations/sign-in-illustration.svg"
                    width="200"
                    height="200"
                    alt="Login page illustration"
                  />
                  <h3>Login into your account</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !username)) && "is-invalid"
                      }`}
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={handleInputChange}
                      placeholder="e.g johndoe"
                    />
                    {(submitted && !username) || error ? (
                      <div className="invalid-feedback">
                        {submitted && !username
                          ? "This field is required"
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !password)) && "is-invalid"
                      }`}
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                    {(submitted && !password) || error ? (
                      <div className="invalid-feedback">
                        {submitted && !password
                          ? "This field is required"
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-center mb-3">
                    {!loading ? (
                      <button type="submit" className="btn btn-sm btn-success">
                        Login
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Checking..
                      </button>
                    )}
                  </div>
                </form>
                <div className="text-center mt-4">
                  <p>
                    <a href="/register">Create Account</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
