import * as React from "react";
import Image from "../atoms/image";
import ButtonGroup from "../level1/buttonGroup";
import CardHeadline from "../atoms/cardHeadline";

const Card = ({ deck, hidden, opponentCard, showResults }: CardProps) => {
  const [currentCard, setCurrentCard] = React.useState({ img: "" });
  const [image, setImage] = React.useState<string>("");
  const [templateReady, setTemplateReady] = React.useState<Boolean>(false);
  const [cardData, setCardData] = React.useState<DataList>([]);
  const [cardName, setCardName] = React.useState<string>("");
  const questionMark: string = "?";

  React.useEffect(() => {
    const car: CarData = deck[0];
    const cardData: DataList = [
      {
        text: `Top Speed: ${hidden ? questionMark : car.topspeed}km/h`,
        onClick: () => {
          showResults(true);
        },
      },
      {
        text: `Power: ${hidden ? questionMark : car.power}hp`,
        onClick: () => {
          showResults(true);
        },
      },
      {
        text: `0-100km/h: ${hidden ? questionMark : car.acceleration}sec`,
        onClick: () => {
          showResults(true);
        },
      },
      {
        text: `Weight: ${hidden ? questionMark : car.weight}kg`,
        onClick: () => {
          showResults(true);
        },
      },
      {
        text: `Cylinder: ${hidden ? questionMark : car.cylinder}`,
        onClick: () => {
          showResults(true);
        },
      },
      {
        text: `Torgue: ${hidden ? questionMark : car.torgue}Nm`,
        onClick: () => {
          showResults(true);
        },
      },
    ];
    setCurrentCard(car);
    setImage(`/images/cars/${car.brand.replace(" ", "")}/${car.img}`);
    setCardData(cardData);
    setCardName(`${car.brand} ${car.model}`);
    setTemplateReady(true);
  }, [hidden]);
  const unknown: string = "/images/cars/unknown.jpg";

  return (
    <div>
      {templateReady && (
        <div className="card">
          <CardHeadline
            text={hidden ? questionMark : cardName}
            deckSize={deck.length}
          />
          <Image
            src={hidden ? unknown : image}
            alt={hidden ? questionMark : currentCard.img}
          />
          <ButtonGroup buttons={cardData} disabled={opponentCard} />
        </div>
      )}
    </div>
  );
};

export default Card;
