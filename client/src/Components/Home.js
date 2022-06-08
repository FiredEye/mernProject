import React, { useState, useEffect } from "react";

export const Home = () => {
  const [UserName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const callHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserName(data.name);
      setShow(true);
      //console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callHomePage();
  }, []);
  return (
    <>
      <section className="page_home">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ms-2">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="home_bg">
                  <p className="text-center hp">WELCOME</p>
                  <h2>{UserName}</h2>
                  <h2 className="text-center">
                    {show
                      ? "Happy to see you Back"
                      : "We Are The Mern Developer"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
