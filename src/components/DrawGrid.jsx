import { useState, useEffect } from "react";
import { scale } from "../utils/constants";

function DrawGrid({ state }) {
  const [newState, setNewState] = useState(0);

  useEffect(() => {
    function checkState(time) {
      if (state.status !== "playing") {
        setNewState(state.update(0).lvl);
      }
      requestAnimationFrame(checkState);
    }
    requestAnimationFrame(checkState);
  });
  return (
    <table className="background" style={{ width: state.level.width * scale }}>
      <tbody>
        {state.level.rows.map((row, i) => {
          return (
            <tr key={"tr" + i} style={{ height: scale }}>
              {row.map((type, j) => {
                return <td key={"td" + j} className={type}></td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DrawGrid;
