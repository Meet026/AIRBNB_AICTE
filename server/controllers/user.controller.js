import User from "../models/user.model.js";
import Property from "../models/properties.model.js";
import { createError } from "../error.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "./.env",
});

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

export const SignUp = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password);

    const existedUser = await User.findOne({ email }).exec(); //exec()=>execute

    if (existedUser) {
      return next(createError(409, "Email-id is already in use!!"));
    }

    const salt = bcrypt.genSaltSync(10);
    //This line generates a salt using the bcrypt library.
    // A salt is a random value added to the password before hashing, ensuring that even if two users have the same password, their hashed values will differ.
    // The number 10 is the salt rounds, which determines the computational cost of the hashing process. Higher values make hashing slower and more secure but require more processing power.
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res.status(201).json({ createdUser });
  } catch (err) {
    next(err);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existedUser = await User.findOne({ email }).exec();

    if (!existedUser) {
      return next(createError(409, "User not Found!!"));
    }

    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      existedUser.password
    );

    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect Password!!"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      existedUser._id
    );

    const loggedInUser = await User.findById(existedUser._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ user: loggedInUser, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const bookProperty = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { propertyId } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return next(createError(404), "Property not found!!");
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404), "User not found!!");
    }

    //add property to purchased array if not already present
    if (!user.bookings.includes(propertyId)) {
      user.bookings.push(propertyId);
      await user.save();
    }

    if (user.bookings.includes(propertyId)) {
      return res.status(409).json({ message: "Property already" });
    }

    return res.status(200).json({ message: "property Booked!!" });
  } catch (err) {
    return next(err);
  }
};

export const getBookedProperty = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT._id).populate({
      path: "bookings",
      model: "Property",
    });

    const bookedProperty = user.bookings;
    return res.status(200).json(bookedProperty);
  } catch (err) {
    next(err);
  }
};

export const addToFavourites = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    console.log(propertyId);
    
    const userJWT = req.user;
    const user = await User.findById(userJWT._id);
    if (!user.favourites.includes(propertyId)) {
      user.favourites.push(propertyId);
      await user.save();
    }
    return res
      .status(200)
      .json({ message: "Property added to favourites successfully!!", user });
  } catch (err) {
    next(err);
  }
};

export const removeFromeFavourites = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT._id);
    user.favourites = user.favourites.filter((fav) => !fav.equals(propertyId));
    await user.save();
    return res
      .status(200)
      .json({ message: "Property removed from Favourites!!!", user });
  } catch (err) {
    next(err);
  }
};

export const getUserFavourites = async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    
    const user = await User.findById(userId).populate("favourites").exec();
    if (!user) {
      return next(createError(404, "User Not Found"));
    }
    
    return res.status(200).json(user?.favourites);
  } catch (err) {
    console.log(err);
  }
};
