import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultProfile from "../Images/defaultProfile.jpg";
import profile from "../Images/profile.jpg";
export const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container shadow p-3 mt-4 mb-5 bg-white rounded">
        <form method="GET">
          <div className="row">
            <div className="col-md-4 ps-5">
              <img
                src={userData.name === "rashik" ? profile : defaultProfile}
                className="img-responsive"
                alt="no"
                width="180px"
                height="210px"
              />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="mt-3 mt-5 mb-5">
                  Rankings:<span>1/10</span>
                </p>

                <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      to="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      to="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Time Line
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edt-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            {/* left side url  */}
            <div className="col-md-4 pt-2">
              <div className="profile-work">
                <p className="aBar">Work Link:</p>
                <Link to="#" target="_tuladhar" className="a">
                  Youtube
                </Link>
                <br />
                <Link to="#" target="_tuladhar" className="a">
                  Instagram
                </Link>
                <br />
                <Link to="#" target="_tuladhar" className="a">
                  Facebook
                </Link>
                <br />
                <Link to="#" target="_tuladhar" className="a">
                  Rashik Tuladhar
                </Link>
              </div>
            </div>

            <div className="col-md-8 pt-2 pb-3 about-info">
              {/* home detail */}
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">{userData._id}</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">{userData.name}</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Emal</label>
                    </div>
                    <div className="col-md-6">{userData.email}</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">{userData.phone}</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">{userData.work}</div>
                  </div>
                </div>
                {/* profile detail */}
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">Expert</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Hourly</label>
                    </div>
                    <div className="col-md-6">10$/hr</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">Ꝏ</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">Expert</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Avaibility</label>
                    </div>
                    <div className="col-md-6">Anytime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
