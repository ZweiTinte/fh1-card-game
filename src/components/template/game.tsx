import * as React from "react";
import ButtonGroup from "../level1/buttonGroup";

const data: DataList = [
  { text: "Amy", onClick: () => {} },
  { text: "Rina", onClick: () => {} },
  { text: "Amanda", onClick: () => {} },
  { text: "Michelle", onClick: () => {} },
];

const Game = () => {
  return (
    <div>
      <ButtonGroup buttons={data} />
    </div>
  );
};

export default Game;
