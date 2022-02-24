import { gravity, jumpSpeed, playerXSpeed } from "../utils/constants";
import Vec from "./Vec";

export default class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
    this.lastTime = 0;
    this.arrowKeys = { ArrowLeft: false, ArrowRight: false, ArrowUp: false };

    window.addEventListener("keydown", (evt) => {
      this.track(evt);
    });

    window.addEventListener("keyup", (evt) => {
      this.track(evt);
    });
    requestAnimationFrame((time) => {
      this._update(time);
    });
  }

  track(evt) {
    if (Object.keys(this.arrowKeys).includes(evt.key)) {
      this.arrowKeys[evt.key] = evt.type === "keydown";
      evt.preventDefault();
    }
  }

  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }

  _update(time) {
    let timeStep = Math.min(time - this.lastTime, 100) / 1000;
    let xSpeed = 0;
    if (this.arrowKeys.ArrowLeft) xSpeed -= playerXSpeed;
    if (this.arrowKeys.ArrowRight) xSpeed += playerXSpeed;

    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * timeStep, 0));

    let ySpeed = this.speed.y + timeStep * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * timeStep));

    this.pos = movedX;
    console.log(this.pos);
    requestAnimationFrame((time) => {
      this._update(time);
    });
    this.lastTime = time;
  }
}

Player.prototype.size = new Vec(0.8, 1.5);

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0;
  if (keys.arrowLeft) xSpeed -= playerXSpeed;
  if (keys.arrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));

  if (!state.level.touches(movedX, this.size, "wall")) pos = movedX;

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));

  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed));
};
