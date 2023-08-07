import TaskModel from "../models/TaskModel";
import { Request, Response } from "express";

const getTasks = async (req: Request, res: Response) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};

const saveTask = (req: Request, res: Response) => {
  const { task } = req.body;

  TaskModel.create({ task })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      res.send({ error, msg: "Something went wrong!" });
    });
};

const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { task } = req.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => res.send("Updated successfully"))
    .catch((error) => {
      res.send({ error, msg: "Something went wrong!" });
    });
};

const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((error) => {
      res.send({ error, msg: "Something went wrong!" });
    });
};

export { getTasks, saveTask, updateTask, deleteTask };
