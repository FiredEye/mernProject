import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signin from "../Images/signin.svg";
export const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);

    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Sucessfull!!");
      console.log("Registration SucessFull!!");
      navigate("/login", "*");
    }
  };
  return (
    <>
      <div className="container w-75 my-1 shadow p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 mt-2 text-center mb-1">
            <h3>Sign Up</h3>
            <form
              method="POST"
              className="register-form p-lg-4"
              id="register-form"
            >
              <div className="form-group p-3">
                <div className="form-group bg-success">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                </div>

                <div className="form-group c">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={user.name}
                    onChange={handleInputs}
                    autoComplete="off"
                  />
                </div>
              </div>

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
                    value={user.email}
                    onChange={handleInputs}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group p-3">
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                </div>
                <div className="form-group c">
                  <input
                    className="form-control"
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Your Phone Number"
                    value={user.phone}
                    onChange={handleInputs}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group p-3">
                <div className="form-group">
                  <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow"></i>
                  </label>
                </div>
                <div className="form-group c">
                  <input
                    className="form-control"
                    type="text"
                    name="work"
                    id="work"
                    placeholder="Your Profession"
                    value={user.work}
                    onChange={handleInputs}
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
                    placeholder="Password"
                    value={user.password}
                    onChange={handleInputs}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group p-3">
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                </div>
                <div className="form-group c">
                  <input
                    className="form-control"
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Repeat your password"
                    value={user.cpassword}
                    onChange={handleInputs}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group form-button p-3">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Register"
                  onClick={PostData}
                />
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <figure>
              <img src={signin} className="img-fluid" alt="sing up image" />
            </figure>
            <Link
              to="/login"
              className="signup-image-link text-center"
              id="Signin"
            >
              I am already a member
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
