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
    const { location, checkIn, checkOutDate } = req.query;

    // Building the filter object dynamically
    const filter = {};
    if (location) filter.location = { $regex: location, $options: "i" }; // Case-insensitive search for location
    if (checkIn) filter.availableFrom = { $lte: new Date(checkIn) }; // Available from before or on check-in date
    if (checkOutDate) filter.availableTo = { $gte: new Date(checkOutDate) }; // Available to after or on check-out date

    // Fetch all properties with filtering
    const properties = await Property.find(filter);

    const total = await Property.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully!",
      properties,
      total,
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

