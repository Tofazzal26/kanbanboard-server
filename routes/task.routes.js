import express from "express";
import connectDB from "../db/connectDB.js";
import TaskModel from "../models/TaskModel/TaskModel.js";

const taskRouter = express.Router();

taskRouter.post("/taskAdd", async (req, res) => {
  try {
    await connectDB();
    const data = req.body;
    const result = new TaskModel({ ...data });
    await result.save();
    res.send({
      data: result,
      message: "Task Created Successfully",
      success: true,
      status: 201,
    });
  } catch (error) {
    res.send({
      message: "There was a server error",
      success: false,
      status: 500,
    });
  }
});

taskRouter.get("/allTask", async (req, res) => {
  try {
    const result = await TaskModel.find();
    res.send({
      data: result,
      message: "All Task",
      success: true,
      status: 201,
    });
  } catch (error) {
    res.send({
      message: "There was a server error",
      success: false,
      status: 500,
    });
  }
});

export default taskRouter;
