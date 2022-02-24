import { wobbleDist, wobbleSpeed } from "../utils/constants";
import Vec from "./Vec";
import State from "./State";

export default class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return "coin";
  }

  static create(pos) {
    const basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(1, 1);

Coin.prototype.collide = function (state) {
  let filtered = state.actors.filter((a) => a !== this);
  let status = state.status;
  if (!filtered.some((a) => a.type === "coin")) status = "won";
  return new State(state.level, filtered, status);
};

Coin.prototype.update = function (time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
};
