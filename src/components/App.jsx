import React, { useState, useEffect } from "react";
import { GAME_LEVELS } from "../utils/constants";
import Level from "./Level";
import DrawGrid from "./DrawGrid";
import DrawActors from "./DrawActors";
import Player from "./Player";
import Coin from "./Coin";

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

function App() {
  const [pos, setPos] = useState(level.startActors[0].pos);

  function loop() {
    setPos(level.startActors[0].pos);
    console.log(pos);
  }
  requestAnimationFrame(loop);

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
      <DrawActors level={level} pos={pos} />
    </div>
  );
}

export default App;
