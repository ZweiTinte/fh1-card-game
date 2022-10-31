import * as React from "react";
import { EMPTY, LOSE, WIN } from "../../consts";
import { fillDeck, getNewCards } from "../../gameHelpers";
import ErrorInfo from "../level1/errorInfo";
import GameInfoSection from "../level1/gameInfoSection";
import CardSubSection from "../level2/cardSubSection";
import CardSection from "../level3/cardSection";

const Game = () => {
  const [plCards, setPlCards] = React.useState<Array<CarData>>([]);
  const [opCards, setOpCards] = React.useState<Array<CarData>>([]);
  const [bonus, setBonus] = React.useState<Array<CarData>>([]);
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [plColor, setPlColor] = React.useState<Array<string>>([EMPTY, EMPTY]);
  const [opColor, setOpColor] = React.useState<Array<string>>([EMPTY, EMPTY]);
  const [playerTurn, setPlayerTurn] = React.useState<boolean>(true);
  const [gameEnded, setGameEnded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

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
              setPlColor([EMPTY, EMPTY]);
              setOpColor([EMPTY, EMPTY]);
              setGameEnded(false);
              setPlCards(fillDeck(data, deckSize));
              setOpCards(fillDeck(data, deckSize));
              setPlayerTurn(Math.floor(Math.random() * 2) + 1 === 1);
              setTemplateReady(true);
            })
            .catch((error: Error) => {
              setError(true);
              setErrorMessage(error.message);
            });
        })
        .catch((error: Error) => {
          setError(true);
          setErrorMessage(error.message);
        });
    }
    fetchCarIDs();
  }

  function setWinLoss(field: string, winLoss: Array<string>): void {
    setPlColor([field, winLoss[0]]);
    setOpColor([field, winLoss[1]]);
  }

  function next(): void {
    if (plColor[1] === WIN) {
      setPlCards(getNewCards(plCards, opCards, bonus));
      setOpCards(opCards.slice(1, opCards.length));
      setBonus([]);
      setPlayerTurn(true);
    } else if (plColor[1] === LOSE) {
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
    setPlColor([EMPTY, EMPTY]);
    setOpColor([EMPTY, EMPTY]);
  }

  React.useEffect(() => {
    newGame();
  }, []);

  return (
    <>
      {templateReady && (
        <>
          {!gameEnded && <GameInfoSection playerTurn={playerTurn} />}
          <CardSection
            playerCards={plCards}
            showResults={showResults}
            playerTurn={playerTurn}
            plColor={plColor}
            opColor={opColor}
            opponentCards={opCards}
            setWinLoss={setWinLoss}
            setShowResults={setShowResults}
            gameEnded={gameEnded}
            setGameEnded={setGameEnded}
          />
          <CardSubSection
            showResults={showResults}
            playerTurn={playerTurn}
            bonus={bonus}
            next={next}
            gameEnded={gameEnded}
            newGame={newGame}
          />
        </>
      )}
      {error && <ErrorInfo message={errorMessage} tryAgain={newGame} />}
    </>
  );
};

export default Game;
