const express = require("express");
const userRouter = express.Router();

const {
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies,
} = require("../controllers/UserControllers");

userRouter.get("/liked/:email", getLikedMovies);
userRouter.post("/add", addToLikedMovies);
userRouter.put("/remove", removeFromLikedMovies);

module.exports = userRouter;
