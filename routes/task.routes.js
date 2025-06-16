import express from "express";
import connectDB from "../db/connectDB.js";
import TaskModel from "../models/TaskModel/TaskModel.js";
import { ObjectId } from "mongodb";

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
      status: 200,
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
      status: 200,
    });
  } catch (error) {
    res.send({
      message: "There was a server error",
      success: false,
      status: 500,
    });
  }
});

taskRouter.patch("/taskStatus/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const { status } = req.body;
    const query = { _id: new ObjectId(id) };
    const updatedTask = await TaskModel.findByIdAndUpdate(
      query,
      { status },
      { new: true }
    );
    res.send({
      data: updatedTask,
      message: "Task status updated",
      success: true,
      status: 200,
    });
  } catch (error) {
    res.send({
      message: "There was a server error",
      success: false,
      status: 500,
    });
  }
});

taskRouter.delete("/taskDelete/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await TaskModel.findByIdAndDelete(query);
    res.send({
      message: "Task Delete Success",
      success: true,
      status: 200,
    });
  } catch (error) {
    res.send({
      message: "There was a server error",
      success: false,
      status: 500,
    });
  }
});

taskRouter.get("/singleTask/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await TaskModel.findOne(query);
    res.send({
      data: result,
      message: "Single Task",
      success: true,
      status: 200,
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
