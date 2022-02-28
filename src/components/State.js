// import { overlap } from "../pages/index";

import { GAME_LEVELS } from "../utils/constants";
import pause from "./Pause";

export default class State {
  constructor(level, display, status, levelChars) {
    this.lvl = 0;
    this.levelChars = levelChars;
    this.levelClass = level;
    this.displayClass = display;
    this.level = this.newLevel(this.lvl);
    this.actors = this.level.startActors;
    this.status = status;
    this.display = null;
  }

  static start({ level, display }, levelChars) {
    return new State(level, display, "playing", levelChars);
  }

  newLevel() {
    this.display = new this.displayClass();
    return new this.levelClass(GAME_LEVELS[this.lvl], this.levelChars);
  }

  get player() {
    return this.actors.find((a) => a.type.includes("player"));
  }

  overlap(actor1, actor2) {
    return (
      actor1.pos.x + actor1.size.x > actor2.pos.x &&
      actor1.pos.x < actor2.pos.x + actor2.size.x &&
      actor1.pos.y + actor1.size.y > actor2.pos.y &&
      actor1.pos.y < actor2.pos.y + actor2.size.y
    );
  }
}

State.prototype.update = function (time) {
  if (!this.display) {
    this.display = new this.displayClass();
  }
  let actors = this.actors.map((actor) => actor.update(time, this));

  if (this.status !== "playing") {
    if (this.status === "won" && this.lvl === GAME_LEVELS.length) {
      alert("Поздравляю! 🎉\nТы победил! 🏆");
      this.lvl = 0;
    }
    this.level = this.newLevel(this.lvl);
    this.actors = this.level.startActors;
    this.status = "playing";
    return this;
  }

  if (this.level.touches(this.player.pos, this.player.size, "lava")) {
    this.player._type = "player lost";
    pause(1).then(() => {
      this.level = this.newLevel(this.lvl);
      this.actors = this.level.startActors;
      this.status = "playing";
      this.player._type = "player";
    });
    return this;
  }
  for (let actor of actors) {
    if (actor !== this.player && this.overlap(actor, this.player)) {
      actor.collide(this);
    }
  }
  this.display.syncState(this);
  return this;
};
