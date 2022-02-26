import { useState, useEffect } from "react";

import DrawGrid from "./DrawGrid";
import DrawActors from "./DrawActors";

import State from "./State";
import Player from "./Player";
import Coin from "./Coin";
import Lava from "./Lava";
import Level from "./Level";
import DOMDisplay from "./DOMDisplay";

const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
};

let state = State.start({ level: Level, display: DOMDisplay }, levelChars);

function App() {
  return (
    <div className="game">
      <DrawGrid state={state} />
      <DrawActors state={state} />
    </div>
  );
}

export default App;
