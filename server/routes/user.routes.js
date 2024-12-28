import express from "express";
import {
  SignIn,
  SignUp,
  bookProperty,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();
router.post("/SignUp", SignUp);
router.post("/SignIn", SignIn);
router.post("/booking", verifyToken ,bookProperty);

export default router;
