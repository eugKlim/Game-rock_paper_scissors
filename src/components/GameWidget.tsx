import React from 'react';

interface IGameWidget {
  playerWin: number;
  botWin: number;
  draw: number;
  allRaunds: number;
}

const GameWidget: React.FC<IGameWidget> = ({
  playerWin,
  botWin,
  draw,
  allRaunds,
}) => {
  return (
    <div>
      <h1 className="text-center font-bold mb-5 text-[20px]">BATTLE RESULT</h1>
      <div className="space-y-1 font-medium">
        <div>
          😀 PLAYER: <span className="text-green-600">{playerWin}</span>
        </div>
        <div>
          🤖 BOT: <span className="text-red-500">{botWin}</span>
        </div>
        <div>
          🤝 DRAW: <span className="text-blue-400">{draw}</span>
        </div>
        <div>ALL ROUNDS: {allRaunds}</div>
      </div>
    </div>
  );
};

export default GameWidget;
