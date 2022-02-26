import State from "./State";
import Vec from "./Vec";

export default class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
    this._type = "lava";
  }

  get type() {
    return this._type;
  }

  static create(pos, ch) {
    if (ch === "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch === "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch === "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

Lava.prototype.collide = function (state) {
  return new State(state.level, state.actors, "lost");
};

Lava.prototype.update = function (time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    this.pos = newPos;
  } else if (this.reset) {
    this.pos = this.reset;
  } else {
    this.speed = this.speed.times(-1);
    this.reset = "";
  }
  return this;
};
