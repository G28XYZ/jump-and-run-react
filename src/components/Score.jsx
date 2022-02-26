import { useState, useEffect } from "react";

function Score({ state }) {
  const [coin, setCoin] = useState(0);
  const coinsCount = state.level.startActors.reduce((c, p) => (p._type === "coin" ? c + 1 : c), 0);

  useEffect(() => {
    setCoin(coinsCount - state.actors.reduce((c, p) => (p._type === "coin" ? c + 1 : c), 0));
  });

  return (
    <div className="score">
      <div className="lvl"> Уровень: {state.lvl + 1}</div>
      <div className="coins">
        Монет: {coin} / {coinsCount} 🪙
      </div>
      <div className="timer"></div>
    </div>
  );
}

export default Score;
