import DrawGrid from "./DrawGrid";
import DrawActors from "./DrawActors";

function App({ state }) {
  return (
    <div className="game">
      <DrawGrid state={state} />
      <DrawActors state={state} />
    </div>
  );
}

export default App;
