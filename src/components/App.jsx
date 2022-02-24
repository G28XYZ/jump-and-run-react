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

  function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
      if (keys.includes(event.key)) {
        down[event.key] = event.type === "keydown";
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
  }
  const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

  function handleMovePlayer() {}

  return (
    <div className="game">
      <DrawGrid level={level} />
      <DrawActors level={level} />
    </div>
  );
}

export default App;
