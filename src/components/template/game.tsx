import * as React from "react";
import Card from "../level2/card";

function fillDeck(data: Array<CarData>, deckSize: number): Array<CarData> {
  let deck = [];
  for (let i = 0; i < deckSize; i++) {
    const randomCard = Math.floor(Math.random() * data.length) + 1;
    deck.push(data[randomCard]);
    data.splice(randomCard, 1);
  }
  return deck;
}

const Game = () => {
  const [playerCards, setPlayerCards] = React.useState<Array<CarData>>([]);
  const [opponentCards, setOpponentCards] = React.useState<Array<CarData>>([]);

  function newGame(): void {
    async function fetchCarIDs() {
      const res = await fetch("http://localhost:3000/cars");
      const data: Array<CarData> = await res.json();
      const deckSize = Math.floor(data.length / 2);
      setPlayerCards(fillDeck(data, deckSize));
      setOpponentCards(fillDeck(data, deckSize));
    }
    fetchCarIDs();
  }

  React.useEffect(() => {
    newGame();
  }, []);

  return (
    <div className="gameLayout">
      <Card deck={playerCards} />
      <Card deck={opponentCards} />
    </div>
  );
};

export default Game;
