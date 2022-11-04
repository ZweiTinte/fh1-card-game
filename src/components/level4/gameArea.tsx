import * as React from "react";
import GameInfoSection from "../level1/gameInfoSection";
import CardSubSection from "../level2/cardSubSection";
import CardSection from "../level3/cardSection";

const GameArea = ({
  gameEnded,
  playerTurn,
  showResults,
  plCards,
  opCards,
  colors,
  setWinLoss,
  setShowResults,
  setGameEnded,
  bonus,
  next,
  newGame,
}: GameAreaProps) => {
  return (
    <>
      {!gameEnded && <GameInfoSection playerTurn={playerTurn} />}
      <CardSection
        plCards={plCards}
        showResults={showResults}
        playerTurn={playerTurn}
        colors={colors}
        opCards={opCards}
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
  );
};

export default GameArea;
