import { scale } from "../utils/constants";
import React, { useState, useEffect } from "react";
import DOMDisplay from "./DOMDisplay";

function DrawActors({ state }) {
  const [milliseconds, setMilliseconds] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  function ft(t) {
    return t.toString().length === 1 ? "0" + t : t;
  }

  useEffect(() => {
    requestAnimationFrame((time) => {
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      // const date = new Date();
      // setMilliseconds(date.getMilliseconds());
      state.update(timeStep);
      // display.scrollPlayerIntoView(level.startActors.find((item) => item.type.includes("player")));
      // level.startActors.forEach((actor) => actor.update(timeStep, level));
      setLastTime(time);
    });
  });

  return (
    <div className="mechanic">
      {state.level.startActors.map((actor, i) => {
        const rect = (
          <div
            key={i}
            className={`actor ${actor.type}`}
            style={{
              width: actor.size.x * scale,
              height: actor.size.y * scale,
              left: actor.pos.x * scale,
              top: actor.pos.y * scale,
            }}
          ></div>
        );
        return rect;
      })}
    </div>
  );
}

export default DrawActors;
