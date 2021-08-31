require("dotenv").config();
const mongoose = require("mongoose");

exports.connect = function () {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED 🔥"))
    .catch((err) => console.log(err));
};
