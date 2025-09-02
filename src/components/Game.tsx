import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { choices } from '../data/Choices';
import { GetWinner } from '../utils/GetWinner';
import GameWidget from './GameWidget';
import GameProcess from './GameProcess';
import GameResult from './GameResult';

type TWinnerType = 'Draw' | 'playerWin' | 'botWin';
type TWinnerResult = [string, TWinnerType];

const Game = () => {
  const [playerSelect, setPlayerSelect] = useState<string>('');
  const [botSelect, setBotSelect] = useState<string>('');
  const [whoWin, setWhoWin] = useState<TWinnerResult | []>([]);
  const [playerWin, setPlayerWin] = useState<number>(0);
  const [botWin, setBotWin] = useState<number>(0);
  const [draw, setDraw] = useState<number>(0);
  const [handGame, setHandGame] = useState<boolean>(false);
  const allRaundsCounter: number = playerWin + botWin + draw;

  const handlePlayGame = (choicePlayer: string) => {
    const choiceBot: string =
      choices[Math.floor(Math.random() * choices.length)];
    const result = GetWinner(choicePlayer, choiceBot);

    setHandGame(true);
    setPlayerSelect(choicePlayer);
    setBotSelect(choiceBot);
    setWhoWin(result);

    switch (result[1]) {
      case 'Draw':
        setDraw((prev) => ++prev);
        break;
      case 'playerWin':
        setPlayerWin((prev) => ++prev);
        break;
      case 'botWin':
        setBotWin((prev) => ++prev);
        break;
    }
  };

  const handleNewGame = () => {
    const newFlagGame = 'newGame';
    setWhoWin([]);
    setPlayerSelect(newFlagGame);
    setBotSelect(newFlagGame);
  };

  useEffect(() => {
    if (handGame) {
      const timer = setTimeout(() => setHandGame(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [handGame]);

  return (
    <>
      <div
        className={`max-w-96 h-[200px] mt-3 mb-4 mx-auto p-5 bg-white text-black rounded-4xl shadow-2xl shadow-purple-950 md:mt-8`}
      >
        <GameProcess playerSelect={playerSelect} botSelect={botSelect} />
      </div>

      {!handGame && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 12,
          }}
          className={`max-w-96 mx-auto pb-10 pt-5 px-6 bg-white text-black rounded-4xl md:shadow-2xl md:shadow-purple-950`}
        >
          <GameWidget
            playerWin={playerWin}
            botWin={botWin}
            draw={draw}
            allRaunds={allRaundsCounter}
          />
          <hr className="mt-4" />
          <GameResult
            whoWin={whoWin}
            playerSelect={playerSelect}
            botSelect={botSelect}
          />

          <div>
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handlePlayGame(choice)}
                className={`block w-full my-5 ${whoWin.length && 'hidden'}`}
              >
                {choice}
              </button>
            ))}
          </div>
          <button
            onClick={handleNewGame}
            className={`mt-5 w-full mr-auto bg-cyan-600 text-white font-bold animate-pulse ${
              !whoWin.length && 'hidden'
            }`}
          >
            Play again
          </button>
        </motion.div>
      )}
    </>
  );
};

export default Game;
