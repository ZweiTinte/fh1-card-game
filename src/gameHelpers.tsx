export function fillDeck(data: CarData[], deckSize: number): CarData[] {
  let deck = [];
  for (let i = 0; i < deckSize; i++) {
    const randomCard = Math.floor(Math.random() * data.length) + 1;
    deck.push(data[randomCard]);
    data.splice(randomCard, 1);
  }
  return deck;
}

export function getNewCards(
  pl1Cards: CarData[],
  pl2Cards: CarData[],
  bonus: CarData[]
): CarData[] {
  return pl1Cards
    .concat(pl1Cards.splice(0, 1))
    .concat(pl2Cards.slice(0, 1))
    .concat(bonus);
}

export async function fetchCarIDs(
  resolveFetching: (data: CarData[]) => void,
  handleError: (error: Error) => void
): Promise<void> {
  await fetch("http://localhost:3000/cars")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch(handleError);
    })
    .catch(handleError);
}
