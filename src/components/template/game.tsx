import * as React from "react";
import Card from "../level2/card";

function fillDeck(
  carIDsList: Array<number>,
  idListLength: number
): Array<number> {
  let deck = [];
  for (let i = 0; i < idListLength; i++) {
    const randomCard = Math.floor(Math.random() * carIDsList.length) + 1;
    deck.push(carIDsList[randomCard]);
    carIDsList.splice(randomCard, 1);
  }
  return deck;
}

const Game = () => {
  const [playerCards, setPlayerCards] = React.useState<Array<number>>([]);
  const [opponentCards, setOpponentCards] = React.useState<Array<number>>([]);

  function newGame(): void {
    async function fetchCarIDs() {
      const res = await fetch("http://localhost:3000/cars");
      const data: Array<CarData> = await res.json();
      const carIDsList: Array<number> = data.map((car) => {
        return car.id;
      });
      const deckSize = Math.floor(carIDsList.length / 2);
      setPlayerCards(fillDeck(carIDsList, deckSize));
      setOpponentCards(fillDeck(carIDsList, deckSize));
    }
    fetchCarIDs();
  }

  React.useEffect(() => {
    newGame();
  }, []);

  return (
    <div className="gameLayout">
      <Card deckSize={playerCards.length} />
      <Card deckSize={opponentCards.length} />
    </div>
  );
};

export default Game;
