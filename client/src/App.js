import React, { createContext, useReducer } from "react";
import "./css/App.css";
import "./css/Contact.css";
import "./css/Home.css";
import "./css/SignupLogin.css";
import "./css/Error.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import { Contact } from "./Components/Contact";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { Error } from "./Components/Error";
import { Logout } from "./Components/Logout";
import Navbar from "./Components/Navbar";
import { initialState, reducer } from "../src/reducer/UseReducer";

//1: Context API

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/logout" element={<Logout />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
