import { scale } from "../utils/constants";

function DrawGrid({ level }) {
  return (
    <table className="background" style={{ width: level.width * scale }}>
      <tbody>
        {level.rows.map((row, i) => {
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
