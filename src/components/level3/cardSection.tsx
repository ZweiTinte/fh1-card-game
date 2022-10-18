import * as React from "react";
import { ACCELERATION, EQUAL, FIELDS, LOSE, WEIGHT, WIN } from "../../consts";
import WinMessage from "../atoms/winMessage";
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
  gameEnded,
  setGameEnded,
}: CardSectionProps) => {
  const [gameResult, setGameResult] = React.useState<number>(0);
  const [gameResultMessage, setGameResultMessage] = React.useState<string>("");
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);

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
    if (playerCards.length === 0) {
      setGameResultMessage("loseMessage");
      setGameResult(0);
      if (opponentCards.length === 0) {
        setGameResultMessage("equalMessage");
        setGameResult(2);
      }
    } else if (opponentCards.length === 0) {
      setGameResultMessage("winMessage");
      setGameResult(1);
    } else if (!playerTurn && !showResults) {
      compareFields(FIELDS[Math.floor(Math.random() * 6)]);
      setShowResults(true);
    }
    if (playerCards.length === 0 || opponentCards.length === 0) {
      setGameEnded(true);
    }
    setTemplateReady(true);
  }, [playerTurn, showResults, playerCards, opponentCards]);

  return (
    <>
      {templateReady && (
        <div className="gameLayout">
          {gameEnded ? (
            <WinMessage style={gameResultMessage} result={gameResult} />
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CardSection;
