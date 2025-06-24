export const GetWinner = (
  choicePlayer: string,
  choiceBot: string
): [string, 'Draw' | 'playerWin' | 'botWin'] => {
  if (choicePlayer === choiceBot) return ['Draw', 'Draw'];

  const winMap: Record<string, string> = {
    stone: 'scissors',
    scissors: 'paper',
    paper: 'stone',
  };

  return winMap[choicePlayer] === choiceBot
    ? ['You win', 'playerWin']
    : ['BOT win', 'botWin'];
};
