// @ts-nocheck
require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ejs = require('ejs');
const path = require('path');
const db = require("./utils/db");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.render('index');
  // res.send("welcome to  authentication system");
});
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});
