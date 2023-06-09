import { useStore } from "../store/store";
import trash from "../assets/trash-can-regular.svg";
import editSvg from "../assets/edit-solid.svg";
import classNames from "classnames";
import "./Task.css";
import { useState } from "react";
type Props = {
  id: string;
};

export default function Task({ id }: Props) {
  const task = useStore((store) => store.tasks.find((task) => task.id === id));
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  const editTask = useStore((store) => store.editTask);

  if (!task) {
    // Handle the case where 'task' is undefined or not found
    return null; // Or render an appropriate message or placeholder
  }

  const [editVal, setEditVal] = useState(task.title);
  const [edit, setEdit] = useState(false);

  return (
    <div
      className="task mt-5 bg-yellow-100"
      draggable
      onDragStart={() => setDraggedTask(task.id)}
    >
      {edit ? (
        <div className="mb-2">
          <input
            className="w-3/4  pl-2 border-black border-2 mr-2"
            type="text"
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={() => {
              editTask(task.id, editVal);
              setEdit(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="font-bold no-underline hover:underline text-lg mb-4">
          <p>{task.title}</p>
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex gap-2 mt-2">
          <img
            className="h-6 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            src={trash}
            onClick={() => deleteTask(task.id)}
          />
          <img
            className="h-6 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            src={editSvg}
            onClick={() => {
              setEdit(true);
            }}
          />
        </div>
        <div className={classNames("status", task.state, "font-mono", "px-2")}>
          {task.state}
        </div>
      </div>
    </div>
  );
}
