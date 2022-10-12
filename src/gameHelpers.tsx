export function fillDeck(
  data: Array<CarData>,
  deckSize: number
): Array<CarData> {
  let deck = [];
  for (let i = 0; i < deckSize; i++) {
    const randomCard = Math.floor(Math.random() * data.length) + 1;
    deck.push(data[randomCard]);
    data.splice(randomCard, 1);
  }
  return deck;
}

export function getNewCards(
  pl1Cards: Array<CarData>,
  pl2Cards: Array<CarData>,
  bonus: Array<CarData>
): Array<CarData> {
  return pl1Cards
    .concat(pl1Cards.splice(0, 1))
    .concat(pl2Cards.slice(0, 1))
    .concat(bonus);
}
