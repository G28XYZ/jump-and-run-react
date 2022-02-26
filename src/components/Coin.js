import { wobbleDist, wobbleSpeed } from "../utils/constants";
import Vec from "./Vec";

export default class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
    this._type = "coin";
  }

  get type() {
    return this._type;
  }

  static create(pos) {
    const basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }

  update = (timeStep) => {
    let wobble = this.wobble + timeStep * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    this.pos = this.basePos.plus(new Vec(0, wobblePos));
    this.wobble = wobble;
    return this;
  };
}

Coin.prototype.size = new Vec(1, 1);

Coin.prototype.collide = function (state) {
  let filtered = state.actors.filter((a) => a !== this);
  let status = state.status;
  if (!filtered.some((a) => a.type === "coin")) {
    state.lvl += 1;
    state.status = "won";
    return;
  }
  state.actors = filtered;
  state.status = status;
  return state;
};
