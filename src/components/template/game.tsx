import * as React from "react";
import { EMPTY, LOSE, WIN } from "../../consts";
import { fillDeck } from "../../gameHelpers";
import Button from "../atoms/button";
import InfoList from "../level1/infoList";
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

  function newGame(): void {
    async function fetchCarIDs() {
      const res = await fetch("http://localhost:3000/cars");
      const data: Array<CarData> = await res.json();
      const deckSize: number = Math.floor(data.length / 2);
      setPlayerCards(fillDeck(data, deckSize));
      setOpponentCards(fillDeck(data, deckSize));
      setTemplateReady(true);
    }
    fetchCarIDs();
  }

  function setWinLoss(field: string, winLoss: Array<string>): void {
    setPlColor([field, winLoss[0]]);
    setOpColor([field, winLoss[1]]);
  }

  function getNewCards(
    pl1Cards: Array<CarData>,
    pl2Cards: Array<CarData>
  ): Array<CarData> {
    return pl1Cards
      .concat(pl1Cards.splice(0, 1))
      .concat(pl2Cards.slice(0, 1))
      .concat(bonus);
  }

  function next(): void {
    if (plColor[1] === WIN) {
      setBonus([]);
      setPlayerCards(getNewCards(playerCards, opponentCards));
      setOpponentCards(opponentCards.slice(1, opponentCards.length));
    } else if (plColor[1] === LOSE) {
      setBonus([]);
      setOpponentCards(getNewCards(opponentCards, playerCards));
      setPlayerCards(playerCards.slice(1, playerCards.length));
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
        <div>
          <CardSection
            playerCards={playerCards}
            showResults={showResults}
            plColor={plColor}
            opColor={opColor}
            opponentCards={opponentCards}
            setWinLoss={setWinLoss}
            setShowResults={setShowResults}
          />
          <CardSubSection showResults={showResults} bonus={bonus} next={next} />
        </div>
      )}
    </>
  );
};

export default Game;
