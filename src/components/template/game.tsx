import * as React from "react";
import Image from "../atoms/image";
import ButtonGroup from "../level1/buttonGroup";

const Game = () => {
  const [image, setImage] = React.useState(
    "/images/cars/Abarth/2010_Abarth_500_esseesse.jpg"
  );
  const data: DataList = [
    {
      text: "Top Speed: 211km/h",
      onClick: () => {
        setImage("/images/cars/Abarth/1968_Abarth_595_esseesse.jpg");
      },
    },
    {
      text: "Power: 118hp",
      onClick: () => {
        setImage("/images/cars/Abarth/2010_Abarth_500_esseesse.jpg");
      },
    },
    { text: "0-100km/h: 7.4sec", onClick: () => {} },
    { text: "Weight: 1110kg", onClick: () => {} },
    { text: "Cylinder: 4", onClick: () => {} },
    { text: "Torgue: 230Nm", onClick: () => {} },
  ];

  return (
    <div>
      <Image src={image} alt="2010_Abarth_500_esseesse" />
      <ButtonGroup buttons={data} />
    </div>
  );
};

export default Game;
