import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./db/connectDB.js";
import taskRouter from "./routes/task.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://kanbanboard-client.vercel.app"],
    credentials: true,
  })
);

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

connectDB();
// user routes
app.use("/login", authRouter);
// task route
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Server is Running");
});
// jwt authentication oparation
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.SECURE_TOKEN, {
    expiresIn: "365d",
  });
  res.cookie("token", token, cookieOptions).send({ success: true });
});
// user logout oparation
app.post("/logout", async (req, res) => {
  const user = req.body;
  res
    .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
});
// user check auth
app.get("/check-auth", async (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ isAuthenticated: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECURE_TOKEN);
    res.send({ isAuthenticated: true, user: decoded });
  } catch (err) {
    res.status(403).send({ isAuthenticated: false });
  }
});
// user inforamtion get
app.get("/userInfo", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: No token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECURE_TOKEN);
    res.send({ user: decoded });
  } catch (err) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
