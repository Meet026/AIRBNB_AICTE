import express from "express";
import {
  SignIn,
  SignUp,
  addToFavourites,
  bookProperty,
  getBookedProperty,
  getUserFavourites,
  removeFromeFavourites,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();
router.post("/SignUp", SignUp);
router.post("/SignIn", SignIn);
router.get("/get-booked-property", verifyToken ,getBookedProperty);
router.get("/get-user-fav", verifyToken ,getUserFavourites);
router.post("/booking", verifyToken ,bookProperty);
router.post("/addToFav", verifyToken ,addToFavourites);
router.patch("/removeFromFav", verifyToken ,removeFromeFavourites);

export default router;
