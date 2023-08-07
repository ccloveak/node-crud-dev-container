import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL ?? "http://localhost:8000/api";

interface Props {
  id: string;
  task: string;
  setUpdateUI: React.Dispatch<React.SetStateAction<boolean>>;
  updateMode: (id: string, text: string) => void;
}

const List = (props: Props) => {
  const { id, task, setUpdateUI, updateMode } = props;
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      setUpdateUI((prevState: any) => !prevState);
    });
  };

  return (
    <li
      key={id}
      className="border-b border-gray-200 py-4 flex justify-between items-center"
    >
      <span>{task}</span>
      <div>
        <button className="mr-2 text-blue-500 hover:text-blue-700 cursor-pointer">
          <PencilSquareIcon
            className="h-6 w-6 text-gray-500 cursor-pointer"
            onClick={() => updateMode(id, task)}
          />
        </button>
        <button className="text-red-500 hover:text-red-700 cursor-pointer">
          <TrashIcon className="h-6 w-6 text-gray-500" onClick={removeTask} />
        </button>
      </div>
    </li>
  );
};

export default List;
