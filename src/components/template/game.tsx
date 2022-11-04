import * as React from "react";
import { EMPTY, LOSE, WIN } from "../../consts";
import { fillDeck, getNewCards } from "../../gameHelpers";
import ErrorInfo from "../level1/errorInfo";
import GameArea from "../level4/gameArea";

const Game = () => {
  const [plCards, setPlCards] = React.useState<Array<CarData>>([]);
  const [opCards, setOpCards] = React.useState<Array<CarData>>([]);
  const [bonus, setBonus] = React.useState<Array<CarData>>([]);
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [colors, setColors] = React.useState<PlayerColors>({
    plColor: [EMPTY, EMPTY],
    opColor: [EMPTY, EMPTY],
  });
  const [playerTurn, setPlayerTurn] = React.useState<boolean>(true);
  const [gameEnded, setGameEnded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  function resetColors(): void {
    setColors({
      plColor: [EMPTY, EMPTY],
      opColor: [EMPTY, EMPTY],
    });
  }

  function handleError(error: Error): void {
    setError(true);
    setErrorMessage(error.message);
  }

  function newGame(): void {
    setTemplateReady(false);
    setError(false);
    setErrorMessage("");
    async function fetchCarIDs() {
      await fetch("http://localhost:3000/cars")
        .then(async (res) => {
          await res
            .json()
            .then((data: Array<CarData>) => {
              const deckSize: number = 10;
              setBonus([]);
              setShowResults(false);
              resetColors();
              setGameEnded(false);
              setPlCards(fillDeck(data, deckSize));
              setOpCards(fillDeck(data, deckSize));
              setPlayerTurn(Math.floor(Math.random() * 2) + 1 === 1);
              setTemplateReady(true);
            })
            .catch(handleError);
        })
        .catch(handleError);
    }
    fetchCarIDs();
  }

  function setWinLoss(field: string, winLoss: Array<string>): void {
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
    resetColors();
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
          newGame={newGame}
        />
      )}
      {error && <ErrorInfo message={errorMessage} tryAgain={newGame} />}
    </>
  );
};

export default Game;
