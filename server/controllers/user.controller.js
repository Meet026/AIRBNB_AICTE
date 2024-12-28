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

    if(user.bookings.includes(propertyId)){
      return res.status(409).json({ message: "Property already"})
    }

    return res.status(200).json({ message: "property Booked!!" });
  } catch (err) {
    return next(err);
  }
};
