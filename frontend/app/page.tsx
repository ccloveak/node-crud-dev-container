"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import List from "@/components/List";
dotenv.config();

type Task = {
  _id: string;
  task: string;
};

export default function Home() {
  const baseURL = process.env.REACT_APP_API_URL ?? "http://localhost:8000/api";
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id: string, text: string) => {
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId("");
      setInput("");
    });
  };
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-5">
      <div className="w-full max-w-md mx-auto overflow-auto">
        <h1 className="text-center text-4xl font-bold mb-5">Task Management</h1>
        <div className="flex items-center justify-center mb-5">
          <input
            value={input}
            name="task"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add task"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
            onClick={updateId ? updateTask : addTask}
          >
            {updateId ? "Update" : "Save"}
          </button>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <ul>
            {tasks &&
              tasks.map((task) => (
                <List
                  key={task._id}
                  id={task._id}
                  task={task.task}
                  setUpdateUI={setUpdateUI}
                  updateMode={updateMode}
                />
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
