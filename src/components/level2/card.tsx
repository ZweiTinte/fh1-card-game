import * as React from "react";
import Image from "../atoms/image";
import ButtonGroup from "../level1/buttonGroup";
import CardHeadline from "../atoms/cardHeadline";
import * as Const from "../../consts";

const Card = ({
  deck,
  hidden,
  disabled,
  compareFields,
  highlight,
}: CardProps) => {
  const [currentCard, setCurrentCard] = React.useState({ img: "" });
  const [image, setImage] = React.useState<string>("");
  const [templateReady, setTemplateReady] = React.useState<Boolean>(false);
  const [cardData, setCardData] = React.useState<DataList>([]);
  const [cardName, setCardName] = React.useState<string>("");

  React.useEffect(() => {
    const car: CarData = deck[0];
    const cardData: DataList = [
      {
        text: `Top Speed: ${hidden ? Const.QUESTIONMARK : car.topspeed}km/h`,
        color: highlight[0] === Const.TOPSPEED ? highlight[1] : Const.EMPTY,
        onClick: () => {
          compareFields(Const.TOPSPEED);
        },
      },
      {
        text: `Power: ${hidden ? Const.QUESTIONMARK : car.power}hp`,
        color: highlight[0] === Const.POWER ? highlight[1] : Const.EMPTY,
        onClick: () => {
          compareFields(Const.POWER);
        },
      },
      {
        text: `0-100km/h: ${hidden ? Const.QUESTIONMARK : car.acceleration}sec`,
        color: highlight[0] === Const.ACCELERATION ? highlight[1] : Const.EMPTY,
        onClick: () => {
          compareFields(Const.ACCELERATION);
        },
      },
      {
        text: `Weight: ${hidden ? Const.QUESTIONMARK : car.weight}kg`,
        color: highlight[0] === Const.WEIGHT ? highlight[1] : Const.EMPTY,
        onClick: () => {
          compareFields(Const.WEIGHT);
        },
      },
      {
        text: `Cylinder: ${hidden ? Const.QUESTIONMARK : car.cylinder}`,
        color: highlight[0] === Const.CYLINDER ? highlight[1] : Const.EMPTY,
        onClick: () => {
          compareFields(Const.CYLINDER);
        },
      },
      {
        text: `Torgue: ${hidden ? Const.QUESTIONMARK : car.torgue}Nm`,
        color: highlight[0] === Const.TORGUE ? highlight[1] : Const.EMPTY,
        onClick: () => {
          compareFields(Const.TORGUE);
        },
      },
    ];
    setCurrentCard(car);
    setImage(`/images/cars/${car.brand.replace(" ", "")}/${car.img}`);
    setCardData(cardData);
    setCardName(`${car.brand} ${car.model}`);
    setTemplateReady(true);
  }, [hidden, highlight]);

  return (
    <div>
      {templateReady && (
        <div className="card">
          <CardHeadline
            text={hidden ? Const.QUESTIONMARK : cardName}
            deckSize={deck.length}
          />
          <Image
            src={hidden ? Const.UNKNOWN : image}
            alt={hidden ? Const.QUESTIONMARK : currentCard.img}
          />
          <ButtonGroup buttons={cardData} disabled={disabled} />
        </div>
      )}
    </div>
  );
};

export default Card;
