import Property from "../models/properties.model.js";
import { createError } from "../error.js";
import mongoose from "mongoose";

export const createProperty = async (req, res, next) => {
  try {
    const { title, desc, img, rating, price } = req.body;

    // Validate required fields
    if (!title || !desc || !price?.org || !price?.mrp) {
      return next(createError(400, "Missing required fields!"));
    }

    // Create a new property
    const newProperty = new Property({
      title,
      desc,
      img,
      rating,
      price,
    });

    const savedProperty = await newProperty.save();

    return res.status(201).json({
      success: true,
      message: "Property created successfully!",
      property: savedProperty,
    });
  } catch (err) {
    next(err);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid Property ID format!"));
    }
    // Fetch the property by ID
    const property = await Property.findById(id);

    if (!property) {
      return next(createError(404, "Property not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Property fetched successfully!",
      property,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllProperties = async (req, res, next) => {
  try {
    const { limit, sortBy, order } = req.query;

    // Default pagination and sorting
    const options = {
      limit: parseInt(limit) || 10,
      sort: { [sortBy || "createdAt"]: order === "desc" ? -1 : 1 },
    };

    // Fetch all properties with pagination and sorting
    const properties = await Property.find({}, null, options);

    const total = await Property.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully!",
      properties,
      pagination: {
        total,
        limit: parseInt(limit) || 10,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {img, title, description, rating} = req.body

    if(!(img || title || description || rating)){
      return next(createError(400, "Missing required fields!"));
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: {
        img,
        title,
        description,
        rating
      } },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return next(createError(404, "Property not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Property updated successfully!",
      property: updatedProperty,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the property
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return next(createError(404, "Property not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

