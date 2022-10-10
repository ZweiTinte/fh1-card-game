import * as React from "react";
import { ACCELERATION, EQUAL, FIELDS, LOSE, WEIGHT, WIN } from "../../consts";
import Card from "../level2/card";

const CardSection = ({
  playerCards,
  showResults,
  plColor,
  opColor,
  opponentCards,
  setWinLoss,
  setShowResults,
  playerTurn,
}: CardSectionProps) => {
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
    if (!playerTurn && !showResults) {
      compareFields(FIELDS[Math.floor(Math.random() * 6)]);
      setShowResults(true);
    }
  }, [playerTurn, showResults]);

  return (
    <div className="gameLayout">
      <Card
        deck={playerCards}
        hidden={false}
        disabled={showResults || !playerTurn}
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
  );
};

export default CardSection;
