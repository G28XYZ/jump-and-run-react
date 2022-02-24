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

  return (
    <div className="game">
      <DrawGrid level={level} />
      <DrawActors level={level} pos={pos} />
    </div>
  );
}

export default App;
