import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createProperty,
  getPropertyById,
  getAllProperties,
  updateProperty,
  deleteProperty
} from "../controllers/properties.controller.js";

const router = express.Router();

router.post("/create-property", verifyToken, createProperty);
router.get("/get-property/:id", verifyToken, getPropertyById);
router.get("/get-property", verifyToken, getAllProperties);
router.patch("/update-property/:id", verifyToken, updateProperty);
router.delete("/delete-property/:id", verifyToken, deleteProperty);

export default router;
