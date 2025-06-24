import React from 'react';

type TWinnerType = 'Draw' | 'playerWin' | 'botWin';
type WinnerResult = [text: string, type: TWinnerType] | [];

interface IGameResult {
  whoWin: WinnerResult;
  playerSelect: string;
  botSelect: string;
}

const getTextColor = (type?: TWinnerType) => {
  switch (type) {
    case 'botWin':
      return 'text-red-500';
    case 'playerWin':
      return 'text-green-600 animate-bounce';
    case 'Draw':
    default:
      return 'text-blue-400';
  }
};

const GameResult: React.FC<IGameResult> = ({
  whoWin,
  playerSelect,
  botSelect,
}) => {
  const colorClass = getTextColor(whoWin[1]);
  const hasRes = whoWin.length > 0;

  return (
    <div>
      <div
        className={`mt-6 mb-8  font-bold h-6 text-3xl text-center ${colorClass}`}
      >
        {hasRes ? (
          <span>{whoWin[0]}</span>
        ) : (
          <h2 className="text-black font-normal">Select to start</h2>
        )}
      </div>
      <div className={`bg-red-100 rounded-2xl py-1 ${!hasRes && 'hidden'}`}>
        <div className="grid grid-cols-3 text-center">
          <div className="text-green-600">PLAYER</div>
          <span>|</span>
          <div className="text-red-600">BOT</div>
          <div>{playerSelect}</div>
          <span>|</span>
          <div>{botSelect}</div>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
