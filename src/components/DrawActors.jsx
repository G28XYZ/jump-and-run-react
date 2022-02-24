import { scale } from "../utils/constants";

function DrawActors({ level, pos }) {
  return (
    <div className="mechanic">
      {level.startActors.map((actor, i) => {
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
