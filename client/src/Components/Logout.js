import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
export const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        navigate("/login", { replace: true });
        if (res.status !== 200) {
          const error = new Error();
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <></>;
};
