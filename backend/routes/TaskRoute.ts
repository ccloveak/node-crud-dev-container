import { Router } from "express";
import {
  getTasks,
  saveTask,
  deleteTask,
  updateTask,
} from "../controllers/TaskControllers";

const router = Router();

router.get("/get", getTasks);
router.post("/save", saveTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
