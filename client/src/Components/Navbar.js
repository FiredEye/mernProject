import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import { UserContext } from "../App";
export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const CommonMeny = () => {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About Me
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
      </>
    );
  };
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Registration
            </Link>
          </li>
        </>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <CommonMeny />
            <RenderMenu />
          </ul>
        </div>
      </div>
    </nav>
  );
}
