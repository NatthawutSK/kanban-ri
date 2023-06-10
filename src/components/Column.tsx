import { useState } from "react";
import { useStore } from "../store/store";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import { shallow } from "zustand/shallow";
import classNames from "classnames";
import "./Column.css";
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
  state: "PLANNED" | "ONGOING" | "DONE";
};

export default function Column({ state }: Props) {
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const handleOpen = () => setOpen(!open);
  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setDrop(false);
        if (draggedTask) {
          moveTask(draggedTask, state);
          setDraggedTask("");
        }
      }}
    >
      <div className="titleWrapper">
        <p>
          {state} ({tasks.length})
        </p>
        <button onClick={handleOpen}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task id={task.id} key={task.id} />
      ))}
      <Dialog open={open} handler={handleOpen}>
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
            onClick={handleOpen}
          >
            Close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              addTask({ id: uuidv4(), title: text, state: state, desc: desc });
              setText("");
              setDesc("");
              handleOpen();
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
