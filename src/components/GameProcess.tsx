import React, { useEffect, useState } from 'react';
import { motion, easeInOut, useAnimation } from 'framer-motion';

import leftHand from '../assets/l-hand.svg';
import rightHand from '../assets/r-hand.svg';
import paper from '../assets/paper.svg';
import scissors from '../assets/scissors.svg';
import stone from '../assets/stone.svg';

interface IGameProcess {
  playerSelect: string;
  botSelect: string;
}

const handAnimationConfig = {
  y: [0, -30, 0, -30, 0, -30, 0],
  rotate: [0, 10, 0, 10, 0],
  transition: {
    duration: 1.5,
    ease: easeInOut,
  },
};

const GameProcess: React.FC<IGameProcess> = ({ playerSelect, botSelect }) => {
  const [playerChoice, setPlayerChoice] = useState<string>('');
  const [botChoice, setBotChoice] = useState<string>('');
  const handAnimation = useAnimation();
  const players = [
    {
      label: 'Player',
      img: playerChoice || leftHand,
      alt: 'left hand',
      flip: false,
    },
    {
      label: 'Bot',
      img: botChoice || rightHand,
      alt: 'right hand',
      flip: true,
    },
  ];

  const startAnimation = () => {
    handAnimation.start(handAnimationConfig);
  };

  useEffect(() => {
    if (playerSelect === 'newGame') {
      return setPlayerChoice(leftHand), setBotChoice(rightHand);
    }

    startAnimation();

    const getSelect = (
      select: string,
      set: React.Dispatch<React.SetStateAction<string>>
    ) => {
      switch (select) {
        case 'stone':
          set(stone);
          break;
        case 'scissors':
          set(scissors);
          break;
        case 'paper':
          set(paper);
          break;
      }
    };

    const timer = setTimeout(() => {
      getSelect(playerSelect, setPlayerChoice);
      getSelect(botSelect, setBotChoice);
    }, 1500);
    return () => clearTimeout(timer);
  }, [playerSelect, botSelect]);

  return (
    <div className="flex justify-between h-full w-full mb-5">
      {players.map(({ label, img, alt, flip }) => (
        <div key={label} className="w-2/5 text-center font-bold">
          <h2>{label}</h2>
          <motion.img
            src={img}
            alt={alt}
            className={`w-32 mt-2 ${flip && 'scale-x-[-1]'}`}
            animate={handAnimation}
          />
        </div>
      ))}
    </div>
  );
};

export default GameProcess;
