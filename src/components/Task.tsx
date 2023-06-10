import { useStore } from "../store/store";
import trash from "../assets/trash-can-regular.svg";
import editSvg from "../assets/edit-solid.svg";
import classNames from "classnames";
import "./Task.css";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

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

  const [text, setText] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);
  const [edit, setEdit] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setEdit(!edit);

  const handleTask = () => setOpen(!open);

  return (
    <div
      className="task mt-5 bg-yellow-100"
      draggable
      onDragStart={() => setDraggedTask(task.id)}
    >
      <Dialog open={edit} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add New Task</DialogHeader>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              onChange={(e) => setText(e.target.value)}
              value={text}
              label="Title"
            />
            <Textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              label="Description"
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            className="bg-sky-500 hover:bg-sky-700"
            onClick={() => {
              setText(task.title);
              setDesc(task.desc);
              handleOpen();
            }}
          >
            Close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              editTask(task.id, text, desc);
              setText(text);
              setDesc(desc);
              handleOpen();
            }}
          >
            Edit
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="font-bold no-underline hover:underline text-lg mb-4 container overflow-hidden">
        <p
          onClick={handleTask}
          className="whitespace-no-wrap overflow-hidden text-ellipsis"
        >
          {task.title}
        </p>
      </div>
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
      <Dialog
        open={open}
        handler={handleTask}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Title</DialogHeader>
        <DialogBody
          className="whitespace-normal overflow-hidden break-words text-lg "
          divider
        >
          {task.title}
        </DialogBody>
        <DialogHeader>Description</DialogHeader>
        <DialogBody
          className="whitespace-normal overflow-hidden break-words"
          divider
        >
          {task.desc}
        </DialogBody>
      </Dialog>
    </div>
  );
}
