import State from "./State";
import Vec from "./Vec";

export default class Lava {
  constructor(pos, speed, reset, type = "lava") {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
    this._type = type;
  }

  get type() {
    return this._type;
  }

  static create(pos, ch) {
    if (ch === "=") {
      return new Lava(pos, new Vec(2, 0), "", "lava fire");
    } else if (ch === "|") {
      return new Lava(pos, new Vec(0, 2), "", "lava fire");
    } else if (ch === "v") {
      return new Lava(pos, new Vec(0, 3), pos, "lava drop");
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

Lava.prototype.collide = function (state) {
  state.status = "lost";
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
