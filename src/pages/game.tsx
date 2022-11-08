import * as React from "react";
import Game from "../components/template/game";
import { GameContextConsumer } from "../contextProviders/gameContext";
import "../styles/main.scss";

const GamePage = () => {
  return (
    <GameContextConsumer>
      {(value) => {
        return <Game game={value.game} />;
      }}
    </GameContextConsumer>
  );
};

export default GamePage;
