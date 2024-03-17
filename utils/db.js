const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/UserAuth",);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err.message);
});
db.once("open", () => {
  console.log("db is connected");
});
