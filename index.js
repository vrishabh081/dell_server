const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const AppError = require("./utils/appError");

// Import Dotenv-
require("dotenv").config();


//All Routes import here
const ErrorHandler = require("./middlewares/errorHandler");
const { connection } = require("./config/database");
const authRouter = require("./routes/authRouter");
const partRouter = require("./routes/partsRouter");


// Global Middleware
app.use(express.json());
app.use(cors());


// All Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", partRouter);


// if Routes are not exists
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} <- this Route not found!`, 404));
});


// Error handling middleware
app.use(ErrorHandler);


// listening server and connection
app.listen(PORT, () => {
  connection();
  console.log({ server: `http://localhost:${PORT}` });
});