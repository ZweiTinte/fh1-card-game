import React, { createContext, useState } from "react";
import { RandomAi } from "../ai/randomAi";

const defaultGameContext: Game = {
  deckSize: 10,
  ai: new RandomAi(),
};

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
        ? JSON.parse(localStorage.getItem("game") as string)
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
