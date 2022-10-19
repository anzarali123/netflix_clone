const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");

const userRouter = require("./routes/UserRoutes");

const app = express();
const PORT = process.env.PORT;
require("dotenv").config();

const dbURL = process.env.MONGODB_URL;

app.use(cors());

app.use(express.json());

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => console.log(error));

app.use("/api/user", userRouter);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
