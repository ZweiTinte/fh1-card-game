import * as React from "react";
import Headline from "../atoms/headline";

const GameInfoSection = ({ playerTurn }: { playerTurn: boolean }) => {
  return (
    <div className="gameLayout">
      <Headline
        text={playerTurn ? "Your Turn!" : "Opponent Turn!"}
        style={playerTurn ? "playerHeadline" : "opponentHeadline"}
      />
    </div>
  );
};

export default GameInfoSection;
