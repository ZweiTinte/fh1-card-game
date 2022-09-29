import * as React from "react";
import { ACCELERATION, EMPTY, EQUAL, LOSE, WEIGHT, WIN } from "../../consts";
import { fillDeck } from "../../gameHelpers";
import Button from "../atoms/button";
import InfoList from "../level1/infoList";
import Card from "../level2/card";

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

  function compareFields(field: string): void {
    if ((playerCards[0] as any)[field] > (opponentCards[0] as any)[field]) {
      if (field !== WEIGHT && field !== ACCELERATION) {
        setWinLoss(field, [WIN, LOSE]);
      } else {
        setWinLoss(field, [LOSE, WIN]);
      }
    } else if (
      (playerCards[0] as any)[field] < (opponentCards[0] as any)[field]
    ) {
      if (field !== WEIGHT && field !== ACCELERATION) {
        setWinLoss(field, [LOSE, WIN]);
      } else {
        setWinLoss(field, [WIN, LOSE]);
      }
    } else {
      setWinLoss(field, [EQUAL, EQUAL]);
    }
    setShowResults(true);
  }

  function next(): void {
    if (plColor[1] === WIN) {
      const newPlayerCards = playerCards
        .concat(playerCards.splice(0, 1))
        .concat(opponentCards.slice(0, 1))
        .concat(bonus);
      setBonus([]);
      setPlayerCards(newPlayerCards);
      setOpponentCards(opponentCards.slice(1, opponentCards.length));
    } else if (plColor[1] === LOSE) {
      const newOpponentCards = opponentCards
        .concat(opponentCards.splice(0, 1))
        .concat(playerCards.slice(0, 1))
        .concat(bonus);
      setBonus([]);
      setOpponentCards(newOpponentCards);
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
          <div className="gameLayout">
            <Card
              deck={playerCards}
              hidden={false}
              disabled={showResults}
              compareFields={compareFields}
              highlight={plColor}
            />
            <Card
              deck={opponentCards}
              hidden={!showResults}
              disabled
              compareFields={compareFields}
              highlight={opColor}
            />
          </div>
          <div className="gameLayout">
            {showResults ? (
              <Button
                text={"Next"}
                color={"nextButton"}
                onClick={() => next()}
              />
            ) : (
              <>
                {bonus.length > 0 && (
                  <InfoList text="Bonus Cards" list={bonus} />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
