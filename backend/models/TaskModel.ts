import mongoose from "mongoose";

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    task: {
      type: String,
      required: true,
    },
  })
);
export default Task;
