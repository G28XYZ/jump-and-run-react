// import { overlap } from "../pages/index";

function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

export default class State {
  constructor(level, actors, status, display) {
    this.level = level;
    this.actors = actors;
    this.status = status;
    this.display = display;
  }

  static start(level, display) {
    return new State(level, level.startActors, "playing", display);
  }

  get player() {
    return this.actors.find((a) => a.type.includes("player"));
  }
}

State.prototype.update = function (time) {
  if (!this.display.dom) {
    this.display = new this.display();
  }
  let actors = this.actors.map((actor) => actor.update(time, this));

  if (this.status !== "playing") {
    this.actors = actors;
    return this;
  }

  if (this.level.touches(this.player.pos, this.player.size, "lava")) {
    this.actors = actors;
    this.status = "lost";
  }
  for (let actor of actors) {
    if (actor !== this.player && overlap(actor, this.player)) {
      actor.collide(this);
    }
  }
  this.display.syncState(this);
  return this;
};
