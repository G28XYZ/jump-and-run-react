import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { GAME_LEVELS } from "./utils/constants";

import App from "./components/App";
import State from "./components/State";
import Player from "./components/Player";
import Coin from "./components/Coin";
import Lava from "./components/Lava";
import Level from "./components/Level";
import DOMDisplay from "./components/DOMDisplay";

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

const level = new Level(GAME_LEVELS[0], levelChars);

const state = State.start(level, DOMDisplay);

ReactDOM.render(
  <React.StrictMode>
    <App state={state} />
  </React.StrictMode>,
  document.getElementById("root")
);
