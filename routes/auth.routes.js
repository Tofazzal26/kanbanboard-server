import express from "express";
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send({ message: "Auth route is working" });
});

export default authRouter;
