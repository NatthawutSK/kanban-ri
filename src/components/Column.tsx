import { useState } from "react";
import { useStore } from "../store/store";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import { shallow } from "zustand/shallow";
import classNames from "classnames";
import "./Column.css";

type Props = {
  state: "PLANNED" | "ONGOING" | "DONE";
};

export default function Column({ state }: Props) {
  const [text, setText] = useState("");
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
          {state} ({tasks.length}
          {/* {state === "PLANNED"
            ? tasksInPlanned.current
            : state === "ONGOING"
            ? tasksInOngoing.current
            : tasksInDone.current} */}
          )
        </p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task id={task.id} key={task.id} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                console.log({ id: uuidv4(), title: text, state: state });

                addTask({ id: uuidv4(), title: text, state: state });
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
