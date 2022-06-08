import React, { useState, useEffect } from "react";

export const Contact = () => {
  const [User, setUser] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUser({ ...User, name: data.name, email: data.email });
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callContactPage();
  }, []);
  //we are stroing data in states

  let name, value;
  const handleInputs = (e) => {
    console.log(e);

    name = e.target.name;
    value = e.target.value;
    setUser({ ...User, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = User;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Some Problem Occured!!");
      console.log("Some Problem Occured!!");
    } else {
      window.alert("Message Send!!");
      console.log("Message Send!!");
      setUser({ ...User, subject: "", message: "" });
    }
  };
  return (
    <>
      <div className="container mt-3 shadow" id="contact-container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-8 order-md-last align-items-stretch">
            <div className="w-100 p-md-5 p-4">
              <h3 className="mb-2">Get in touch</h3>
              <form
                method="POST"
                id="contactForm"
                name="contactForm"
                className="contactForm"
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="label" htmlFor="name">
                        Full Name
                      </label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={User.name}
                        onChange={handleInputs}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="label" htmlFor="email">
                        Email Address
                      </label>
                      <br />
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={User.email}
                        onChange={handleInputs}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label className="label" htmlFor="subject">
                        Subject
                      </label>
                      <br />
                      <input
                        className="form-control"
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        value={User.subject}
                        onChange={handleInputs}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label className="label" htmlFor="#">
                        Message
                      </label>
                      <br />
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        cols="30"
                        rows="4"
                        placeholder="Message"
                        value={User.message}
                        onChange={handleInputs}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Send Message"
                        className="form-submit"
                        onClick={PostData}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-4 d-flex align-items-stretch "
            id="contact-detail"
          >
            <div className="info-wrap w-100 p-md-5 p-4" id="contact-detail1">
              <h3>Let's get in touch</h3>

              <p className="mb-4">
                We're open for any suggestion or just to have a chat
              </p>
              <div className="dbox w-100 d-flex align-items-start">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-map-marker"></span>
                </div>
                <div className="text pl-3">
                  <p>
                    <span>Address:</span> 198 West 21th Street, Suite 721 New
                    York NY 10016
                  </p>
                </div>
              </div>
              <div className="dbox w-100 d-flex align-items-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-phone"></span>
                </div>
                <div className="text pl-3">
                  <p>
                    <span>Phone:</span>

                    <a href="#">+ 1235 2355 98</a>
                  </p>
                </div>
              </div>
              <div className="dbox w-100 d-flex align-items-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-paper-plane"></span>
                </div>
                <div className="text pl-3">
                  <p>
                    <span>Email:</span>
                    <a href="#">info@yoursite.com</a>
                  </p>
                </div>
              </div>
              <div className="dbox w-100 d-flex align-items-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-globe"></span>
                </div>
                <div className="text pl-3">
                  <p>
                    <span>Website:</span> <a href="#">yoursite.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
