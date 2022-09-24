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
  const [templateReady, setTemplateReady] = React.useState<Boolean>(false);
  const [showResults, setShowResults] = React.useState<Boolean>(false);

  function newGame(): void {
    async function fetchCarIDs() {
      const res = await fetch("http://localhost:3000/cars");
      const data: Array<CarData> = await res.json();
      const deckSize: number = Math.floor(data.length / 2);
      setPlayerCards(fillDeck(data, deckSize));
      setOpponentCards(fillDeck(data, deckSize));
      setTemplateReady(true);
    }
    fetchCarIDs();
  }

  React.useEffect(() => {
    newGame();
  }, []);

  return (
    <>
      {templateReady && (
        <div className="gameLayout">
          <Card
            deck={playerCards}
            hidden={false}
            opponentCard={false}
            showResults={setShowResults}
          />
          <Card
            deck={opponentCards}
            hidden={!showResults}
            opponentCard
            showResults={setShowResults}
          />
        </div>
      )}
    </>
  );
};

export default Game;
