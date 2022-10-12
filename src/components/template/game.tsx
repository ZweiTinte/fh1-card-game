import * as React from "react";
import { EMPTY, LOSE, WIN } from "../../consts";
import { fillDeck, getNewCards } from "../../gameHelpers";
import Headline from "../atoms/headline";
import CardSubSection from "../level2/cardSubSection";
import CardSection from "../level3/cardSection";

const Game = () => {
  const [playerCards, setPlayerCards] = React.useState<Array<CarData>>([]);
  const [opponentCards, setOpponentCards] = React.useState<Array<CarData>>([]);
  const [bonus, setBonus] = React.useState<Array<CarData>>([]);
  const [templateReady, setTemplateReady] = React.useState<Boolean>(false);
  const [showResults, setShowResults] = React.useState<Boolean>(false);
  const [plColor, setPlColor] = React.useState<Array<string>>([EMPTY, EMPTY]);
  const [opColor, setOpColor] = React.useState<Array<string>>([EMPTY, EMPTY]);
  const [playerTurn, setPlayerTurn] = React.useState<Boolean>(true);

  function newGame(): void {
    async function fetchCarIDs() {
      const res = await fetch("http://localhost:3000/cars");
      const data: Array<CarData> = await res.json();
      const deckSize: number = Math.floor(data.length / 2);
      setPlayerCards(fillDeck(data, deckSize));
      setOpponentCards(fillDeck(data, deckSize));
      setPlayerTurn(Math.floor(Math.random() * 2) + 1 === 1);
      setTemplateReady(true);
    }
    fetchCarIDs();
  }

  function setWinLoss(field: string, winLoss: Array<string>): void {
    setPlColor([field, winLoss[0]]);
    setOpColor([field, winLoss[1]]);
  }

  function next(): void {
    if (plColor[1] === WIN) {
      setPlayerCards(getNewCards(playerCards, opponentCards, bonus));
      setOpponentCards(opponentCards.slice(1, opponentCards.length));
      setBonus([]);
      setPlayerTurn(true);
    } else if (plColor[1] === LOSE) {
      setOpponentCards(getNewCards(opponentCards, playerCards, bonus));
      setPlayerCards(playerCards.slice(1, playerCards.length));
      setBonus([]);
      setPlayerTurn(false);
    } else {
      setBonus(
        bonus.concat(opponentCards.slice(0, 1)).concat(playerCards.slice(0, 1))
      );
      setPlayerCards(playerCards.slice(1, playerCards.length));
      setOpponentCards(opponentCards.slice(1, opponentCards.length));
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
          <div className="gameLayout">
            <Headline
              text={playerTurn ? "Your Turn!" : "Opponent Turn!"}
              style={playerTurn ? "playerHeadline" : "opponentHeadline"}
            />
          </div>
          <CardSection
            playerCards={playerCards}
            showResults={showResults}
            playerTurn={playerTurn}
            plColor={plColor}
            opColor={opColor}
            opponentCards={opponentCards}
            setWinLoss={setWinLoss}
            setShowResults={setShowResults}
          />
          <CardSubSection
            showResults={showResults}
            playerTurn={playerTurn}
            bonus={bonus}
            next={next}
          />
        </>
      )}
    </>
  );
};

export default Game;
