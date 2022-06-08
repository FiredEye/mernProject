import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../Images/login.jpg";
import { UserContext } from "../App";
export const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Sucessfull");
      navigate("/home");
    }
  };
  return (
    <>
      <div className="container w-75 my-3 shadow p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <figure>
              <img src={signup} className="img-fluid" alt="sing up image" />
            </figure>
            <Link
              to="/signup"
              className="signup-image-link text-center"
              id="Login"
            >
              Create an account
            </Link>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center my-5">
            <h3>Sign Up</h3>
            <form
              method="POST"
              className="register-form p-5"
              id="register-form"
            >
              <div className="form-group p-3">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                </div>
                <div className="form-group c">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group p-3">
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                </div>
                <div className="form-group c">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group form-button p-3">
                <input
                  type="submit"
                  name="login"
                  id="login"
                  className="form-submit"
                  value="Log In"
                  onClick={loginUser}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
