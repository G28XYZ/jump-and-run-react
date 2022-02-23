import { GAME_LEVELS } from "../utils/constants";
import Level from "./Level";
import DrawGrid from "./DrawGrid";
import DrawActors from "./DrawActors";
import Player from "./Player";

function App() {
  const levelChars = {
    ".": "empty",
    "#": "wall",
    "+": "lava",
    "@": Player,
    o: "Coin",
    "=": "Lava",
    "|": "Lava",
    v: "Lava",
  };

  const level = new Level(GAME_LEVELS[0], levelChars);

  return (
    <div className="game">
      <DrawGrid level={level} />
      <DrawActors level={level} />
    </div>
  );
}

export default App;
