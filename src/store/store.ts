import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskState = {
  id: string;
  title: string;
  state: "PLANNED" | "ONGOING" | "DONE";
};

export type TaskStore = {
  tasks: TaskState[];
  draggedTask: null | string;
  addTask: (task: TaskState) => void;
  deleteTask: (id: string) => void;
  setDraggedTask: (title: string) => void;
  moveTask: (title: string, state: "PLANNED" | "ONGOING" | "DONE") => void;
  editTask: (id: string, edited: string) => void;
};

export const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,
      addTask: (task: TaskState) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setDraggedTask: (id: null | string) => set({ draggedTask: id }),
      moveTask: (id: string, state: "PLANNED" | "ONGOING" | "DONE") =>
        set((store) => ({
          tasks: store.tasks.map((task) => {
            if (task.id === id) {
              return { ...task, state: state };
            }
            return task;
          }),
        })),
      editTask: (id: string, edited: string) =>
        set((store) => ({
          tasks: store.tasks.map((task) => {
            if (task.id === id) {
              return { ...task, title: edited };
            }
            return task;
          }),
        })),
    }),
    { name: "task-store" }
  )
);
