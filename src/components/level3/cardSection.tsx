import * as React from "react";
import { ACCELERATION, EQUAL, LOSE, WEIGHT, WIN } from "../../consts";
import Card from "../level2/card";

const CardSection = ({
  playerCards,
  showResults,
  plColor,
  opColor,
  opponentCards,
  setWinLoss,
  setShowResults,
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

  return (
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
  );
};

export default CardSection;
