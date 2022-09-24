import * as React from "react";
import { ACCELERATION, EMPTY, EQUAL, LOSE, WEIGHT, WIN } from "../../consts";
import { fillDeck } from "../../gameHelpers";
import Button from "../atoms/button";
import Card from "../level2/card";

const Game = () => {
  const [playerCards, setPlayerCards] = React.useState<Array<CarData>>([]);
  const [opponentCards, setOpponentCards] = React.useState<Array<CarData>>([]);
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
          {showResults && (
            <div className="gameLayout">
              <Button
                text={"Next"}
                color={"nextButton"}
                onClick={() => {
                  window.location.reload();
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Game;
