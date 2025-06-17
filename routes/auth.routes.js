import express from "express";
import connectDB from "../db/connectDB.js";
import UserModel from "./../models/UserModel/UserModel.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();
// usr validation data post mongoose
authRouter.post("/validation", async (req, res) => {
  try {
    await connectDB();
    const user = req.body;
    const currentUser = await UserModel.findOne({ email: user?.email });
    if (currentUser) {
      const isPasswordMatched = bcrypt.compareSync(
        user.password,
        currentUser.password
      );
      if (isPasswordMatched) {
        return res.send({
          message: "User Login Successfully",
          success: false,
          status: 200,
        });
      } else {
        return res.send({
          message: "User Already Exists but Password is Incorrect",
          success: false,
          status: 403,
        });
      }
    }
    const hashPassword = bcrypt.hashSync(user.password, 14);
    const newUser = new UserModel({ ...user, password: hashPassword });
    await newUser.save();

    res.send({
      data: newUser,
      message: "User Created Successfully",
      success: true,
      status: 201,
    });
  } catch (error) {
    // console.error("Registration Error", error.message);
    res.send({
      message: "There was a server error",
      success: false,
      status: 500,
    });
  }
});

export default authRouter;
