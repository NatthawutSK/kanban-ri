import Column from "./components/Column";
import "./App.css";
type Props = {};

export default function App({}: Props) {
  return (
    <div className="App pt-5">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
}
