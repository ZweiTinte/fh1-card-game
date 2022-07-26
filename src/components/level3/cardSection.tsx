import * as React from "react";
import { EQUAL, LOSE, LOWER_FIELDS, WIN } from "../../consts";
import { GameContext } from "../../contextProviders/gameContext";
import WinMessage from "../atoms/winMessage";
import Card from "../level2/card";

const CardSection = ({
  plCards,
  showResults,
  colors,
  opCards,
  setWinLoss,
  setShowResults,
  playerTurn,
  gameEnded,
  setGameEnded,
}: CardSectionProps) => {
  const [gameResult, setGameResult] = React.useState<number>(0);
  const [gameResultMessage, setGameResultMessage] = React.useState<string>("");
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const game: Game = React.useContext(GameContext).game;

  function compareFields(field: string): void {
    if (plCards[0] && opCards[0]) {
      if (
        plCards[0][field as keyof CarData] > opCards[0][field as keyof CarData]
      ) {
        if (!LOWER_FIELDS.includes(field)) {
          setWinLoss(field, [WIN, LOSE]);
        } else {
          setWinLoss(field, [LOSE, WIN]);
        }
      } else if (
        plCards[0][field as keyof CarData] < opCards[0][field as keyof CarData]
      ) {
        if (!LOWER_FIELDS.includes(field)) {
          setWinLoss(field, [LOSE, WIN]);
        } else {
          setWinLoss(field, [WIN, LOSE]);
        }
      } else {
        setWinLoss(field, [EQUAL, EQUAL]);
      }
      setShowResults(true);
    }
  }

  React.useEffect(() => {
    setTemplateReady(false);
    if (plCards.length === 0) {
      setGameResultMessage("loseMessage");
      setGameResult(0);
      if (opCards.length === 0) {
        setGameResultMessage("equalMessage");
        setGameResult(2);
      }
    } else if (opCards.length === 0) {
      setGameResultMessage("winMessage");
      setGameResult(1);
    } else if (!playerTurn && !showResults) {
      compareFields(game.ai.getAiResponse(opCards[0]));
      setShowResults(true);
    }
    if (plCards.length === 0 || opCards.length === 0) {
      setGameEnded(true);
    }
    setTemplateReady(true);
  }, [playerTurn, showResults, plCards, opCards]);

  return (
    <>
      {templateReady && (
        <div className="gameLayout">
          {gameEnded ? (
            <WinMessage style={gameResultMessage} result={gameResult} />
          ) : (
            <>
              <Card
                deck={plCards}
                hidden={false}
                disabled={showResults || !playerTurn}
                compareFields={compareFields}
                highlight={colors.plColor}
              />
              <Card
                deck={opCards}
                hidden={!showResults}
                disabled
                compareFields={compareFields}
                highlight={colors.opColor}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CardSection;
