import React, { createContext, useState } from "react";
import { aiList } from "../ai/aiHelpers";
import { RandomAi } from "../ai/randomAi";

const defaultGameContext: Game = {
  deckSize: 10,
  ai: new RandomAi(),
};

function getGameFromLocalStorage(): Game {
  let game = JSON.parse(localStorage.getItem("game") as string);
  game.ai = aiList.filter(function (ai) {
    return ai.value.name === game.ai.name;
  })[0].value;
  return game;
}

export const GameContext = createContext({
  game: defaultGameContext,
  setGame: (newGame: Game) => {},
});

export const GameContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const setGame = (newGame: Game) => {
    setGameContext(newGame);
  };

  const initState: GameProps = {
    game:
      localStorage.getItem("game") !== null
        ? getGameFromLocalStorage()
        : defaultGameContext,
    setGame: setGame,
  };

  const [gameContext, setGameContext] = useState<Game>(initState.game);

  return (
    <GameContext.Provider
      value={{
        game: gameContext,
        setGame: (newGame: Game) => {
          setGameContext(newGame);
          localStorage.setItem("game", JSON.stringify(newGame));
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const GameContextConsumer = ({
  children,
}: {
  children: (game: GameProps) => JSX.Element;
}) => {
  return (
    <GameContext.Consumer>
      {(value: GameProps) => {
        return children(value);
      }}
    </GameContext.Consumer>
  );
};
