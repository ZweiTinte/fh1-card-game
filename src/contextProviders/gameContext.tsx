import React, { createContext, useState } from "react";

const defaultGameContext: Game = {
  deckSize: 10,
};

export const GameContext = createContext({
  game: defaultGameContext,
  setGame: (newGame: Game) => {
    console.log("Happy");
  },
});

export const GameContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const setGame = (newGame: Game) => {
    setGameContext(newGame);
  };

  const initState: { game: Game; setGame: (newGame: Game) => void } = {
    game: defaultGameContext,
    setGame: setGame,
  };

  const [gameContext, setGameContext] = useState<Game>(initState.game);

  return (
    <GameContext.Provider
      value={{
        game: gameContext,
        setGame: (newGame: Game) => {
          setGameContext(newGame);
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
