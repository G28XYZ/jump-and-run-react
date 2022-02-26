import { gravity, jumpSpeed, playerXSpeed } from "../utils/constants";
import Vec from "./Vec";

export default class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
    this._type = "player";
    this.arrowKeys = { ArrowLeft: false, ArrowRight: false, ArrowUp: false };
    window.addEventListener("keydown", this.track);
    window.addEventListener("keyup", this.track);
  }

  track = (evt) => {
    if (Object.keys(this.arrowKeys).includes(evt.key)) {
      this.arrowKeys[evt.key] = evt.type === "keydown";
      evt.preventDefault();
    }
  };

  get type() {
    return this._type;
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }

  update(timeStep, state) {
    let xSpeed = 0;
    if (this.arrowKeys.ArrowLeft) {
      this._type = "player left";
      xSpeed -= playerXSpeed;
    }
    if (this.arrowKeys.ArrowRight) {
      this._type = "player";
      xSpeed += playerXSpeed;
    }

    if (Object.values(this.arrowKeys).every((key) => key === false)) {
      this._type = this._type + " stay";
    }

    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * timeStep, 0));

    if (!state.level.touches(movedX, this.size, "wall")) pos = movedX;

    let ySpeed = this.speed.y + timeStep * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * timeStep));

    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (this.arrowKeys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }
    this.pos = pos;
    this.speed = new Vec(xSpeed, ySpeed);
    return this;
  }
}

Player.prototype.size = new Vec(0.8, 1.5);
