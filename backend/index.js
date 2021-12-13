const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");
const port = process.env.PORT;

mongoose
  .connect("mongodb://localhost:27017/sellit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Database Connection Failed!!!");
  });

app.listen(port, () => {
  console.log(`Sell It app is running at http://localhost:${port}`);
});

//Middlewares
app.use(express.json()); //inplace of bodyParser:  app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

