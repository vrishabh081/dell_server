const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log({ connect: "Connection Successfully!" });
    })
    .catch((err) => {
      console.log({ connect: "Connection Fail!", error: err });
    });
};

module.exports = {
  connection,
};