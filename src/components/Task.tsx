import { useStore } from "../store/store";
import trash from "../assets/trash-2.svg";
import classNames from "classnames";
import "./Task.css";
type Props = {
  id: string;
};

export default function Task({ id }: Props) {
  const task = useStore((store) => store.tasks.find((task) => task.id === id));
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  if (!task) {
    // Handle the case where 'task' is undefined or not found
    return null; // Or render an appropriate message or placeholder
  }
  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.id)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} onClick={() => deleteTask(task.id)} />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
