const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hello world from the server router.js");
});

//Using Promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "please fill all the fields" });
//   }

//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "Email already exist" });
//     }

//     const user = new User({ name, email, phone, work, password, cpassword });

//     user.save().then(() => { res.status(201).json({ message: "user registered sucessfully" }); }).catch((err) => {console.log(err);
//       });
//   });
// });

//Asyc-await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "please fill all the fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //hashing password and cpassword

      await user.save();

      res.status(201).json({ message: "user registered sucessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.status(201).json({ message: "awsome user" });
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please Fill the data" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      //need to generate the token and store cookie after the password match
      token = await userLogin.generateAuthToken();
      //console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credientials pass" });
      } else {
        res.json({ message: "login sucessfull" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credientials email" });
    }
  } catch (err) {
    console.log(err);
  }
});
//about page
router.get("/about", authenticate, (req, res) => {
  console.log("Hello my About");
  res.send(req.rootUser);
});

//get user data for contact page and home page
router.get("/getdata", authenticate, (req, res) => {
  console.log("Hello my Data");
  res.send(req.rootUser);
});

//contact page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    //console.log(name, email, subject, message);
    if (!name || !email || !subject || !message) {
      console.log("error in contact form");
      return res.status(400).json({ error: "Please fill the contact form" });
    }
    const userContact = await User.findOne({ _id: req.userId });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        subject,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "user Contact Sucessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//logout page
router.get("/logout", (req, res) => {
  console.log("Hello my Logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
