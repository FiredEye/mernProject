const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParesr = require("cookie-parser");
app.use(cookieParesr());
dotenv.config({ path: "./config.env" });

require("./db/conn.js");
//const User = require("./model/userSchema.js");

app.use(express.json());

//we link the router files to make our route easy
app.use(require("./router/auth"));

const PORT = process.env.PORT;

// //Middleware

// const middleware = (req, res, next) => {
//   console.log("hello my middle ware");
//   next();
// };

// app.get("/", (req, res) => {
//   res.send("hello world from the server app.js");
// });
// app.get("/about", middleware, (req, res) => {
//   res.send("hello about world from the server");
// });
// app.get("/contact", (req, res) => {
//   res.send("hello contact world from the server");
// });
app.get("/signin", (req, res) => {
  res.send("hello signin world from the server");
});
app.get("/signout", (req, res) => {
  res.send("hello logout world from the server");
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
