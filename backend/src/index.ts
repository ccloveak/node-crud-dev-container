import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import routes from "../routes/TaskRoute";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT ?? 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((error) => {
    console.log(error);
    process.exit();
  });

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
