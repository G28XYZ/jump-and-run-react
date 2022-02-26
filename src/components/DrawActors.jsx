import { scale } from "../utils/constants";
import React, { useState, useEffect } from "react";
import Score from "./Score";

function DrawActors({ state }) {
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    requestAnimationFrame((time) => {
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      state.update(timeStep);
      setLastTime(time);
    });
  });

  return (
    <>
      <Score state={state} />
      <div className="mechanic">
        {state.actors.map((actor, i) => {
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
    </>
  );
}

export default DrawActors;
