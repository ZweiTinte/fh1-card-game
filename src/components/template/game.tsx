import * as React from "react";
import { COLORS_EMPTY, LOSE, WIN } from "../../consts";
import { fetchCarIDs, fillDeck, getNewCards } from "../../gameHelpers";
import ErrorInfo from "../level1/errorInfo";
import GameArea from "../level4/gameArea";

const Game = ({ game }: GameProps) => {
  const [plCards, setPlCards] = React.useState<CarData[]>([]);
  const [opCards, setOpCards] = React.useState<CarData[]>([]);
  const [bonus, setBonus] = React.useState<CarData[]>([]);
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [colors, setColors] = React.useState<PlayerColors>(COLORS_EMPTY);
  const [playerTurn, setPlayerTurn] = React.useState<boolean>(true);
  const [gameEnded, setGameEnded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  function handleError(error: Error): void {
    setError(true);
    setErrorMessage(error.message);
  }

  function resolveFetching(data: CarData[]): void {
    setBonus([]);
    setShowResults(false);
    setColors(COLORS_EMPTY);
    setGameEnded(false);
    setPlCards(fillDeck(data, game.deckSize));
    setOpCards(fillDeck(data, game.deckSize));
    setPlayerTurn(Math.floor(Math.random() * 2) + 1 === 1);
    setTemplateReady(true);
  }

  function newGame(): void {
    setTemplateReady(false);
    setError(false);
    setErrorMessage("");
    fetchCarIDs(resolveFetching, handleError);
  }

  function setWinLoss(field: string, winLoss: string[]): void {
    if (game.ai.learning) {
      game.ai.learn(field, winLoss[0], opCards[0]);
    }
    setColors({
      plColor: [field, winLoss[0]],
      opColor: [field, winLoss[1]],
    });
  }

  function next(): void {
    if (colors.plColor[1] === WIN) {
      setPlCards(getNewCards(plCards, opCards, bonus));
      setOpCards(opCards.slice(1, opCards.length));
      setBonus([]);
      setPlayerTurn(true);
    } else if (colors.plColor[1] === LOSE) {
      setOpCards(getNewCards(opCards, plCards, bonus));
      setPlCards(plCards.slice(1, plCards.length));
      setBonus([]);
      setPlayerTurn(false);
    } else {
      setBonus(bonus.concat(opCards.slice(0, 1)).concat(plCards.slice(0, 1)));
      setPlCards(plCards.slice(1, plCards.length));
      setOpCards(opCards.slice(1, opCards.length));
    }
    setShowResults(false);
    setColors(COLORS_EMPTY);
  }

  React.useEffect(() => {
    newGame();
  }, []);

  return (
    <>
      {templateReady && (
        <GameArea
          gameEnded={gameEnded}
          playerTurn={playerTurn}
          showResults={showResults}
          plCards={plCards}
          opCards={opCards}
          colors={colors}
          setWinLoss={setWinLoss}
          setShowResults={setShowResults}
          setGameEnded={setGameEnded}
          bonus={bonus}
          next={next}
        />
      )}
      {error && <ErrorInfo message={errorMessage} tryAgain={newGame} />}
    </>
  );
};

export default Game;
