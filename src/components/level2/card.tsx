import * as React from "react";
import Image from "../atoms/image";
import ButtonGroup from "../level1/buttonGroup";
import CardHeadline from "../atoms/cardHeadline";

const Card = ({ deckSize }: CardProps) => {
  const [currentCard, setCurrentCard] = React.useState({ img: "" });
  const [image, setImage] = React.useState<string>("");
  const [templateReady, setTemplateReady] = React.useState<Boolean>(false);
  const [cardData, setCardData] = React.useState<DataList>([]);
  const [cardName, setCardName] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchCars() {
      const res = await fetch("http://localhost:3000/cars");
      const data: Array<CarData> = await res.json();
      const car = data[Math.floor(Math.random() * data.length) + 1];
      const cardData: DataList = [
        {
          text: `Top Speed: ${car.topspeed}km/h`,
          onClick: () => {
            setImage("/images/cars/Abarth/1968_Abarth_595_esseesse.jpg");
          },
        },
        {
          text: `Power: ${car.power}hp`,
          onClick: () => {
            setImage("/images/cars/Abarth/2010_Abarth_500_esseesse.jpg");
          },
        },
        { text: `0-100km/h: ${car.acceleration}sec`, onClick: () => {} },
        { text: `Weight: ${car.weight}kg`, onClick: () => {} },
        { text: `Cylinder: ${car.cylinder}`, onClick: () => {} },
        { text: `Torgue: ${car.torgue}Nm`, onClick: () => {} },
      ];
      setCurrentCard(car);
      setImage(`/images/cars/${car.brand.replace(" ", "")}/${car.img}`);
      setCardData(cardData);
      setCardName(`${car.brand} ${car.model}`);
      setTemplateReady(true);
    }
    fetchCars();
  }, []);

  return (
    <div>
      {templateReady && (
        <div className="card">
          <CardHeadline text={cardName} deckSize={deckSize} />
          <Image src={image} alt={currentCard.img} />
          <ButtonGroup buttons={cardData} />
        </div>
      )}
    </div>
  );
};

export default Card;
