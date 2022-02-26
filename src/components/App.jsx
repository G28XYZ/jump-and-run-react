import { useState, useEffect } from "react";

import DrawGrid from "./DrawGrid";
import DrawActors from "./DrawActors";

import { GAME_LEVELS } from "../utils/constants";

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

let level = new Level(GAME_LEVELS[0], levelChars);
let state = State.start(level, DOMDisplay);

function App() {
  const [newState, setNewState] = useState();
  const [time, setTime] = useState();

  if (!newState) {
    setNewState(state);
  }

  // useEffect(() => {
  //   const checkState = setInterval(() => {
  //     console.log("app");
  //     if (state.status === "lost") {
  //       level = new Level(GAME_LEVELS[0], levelChars);
  //       state = State.start(level, DOMDisplay);
  //       setNewState(state);
  //       clearInterval(checkState);
  //     }
  //   }, 1000);
  // });

  return (
    <div className="game">
      <DrawGrid state={newState} />
      <DrawActors state={newState} />
    </div>
  );
}

export default App;
