import * as React from "react";
import Button from "../atoms/button";
import InfoList from "../level1/infoList";

const CardSubSection = ({
  showResults,
  playerTurn,
  bonus,
  next,
}: CardSubSectionProps) => {
  return (
    <div className={"gameLayout"}>
      {(!playerTurn || !showResults) && (
        <>{bonus.length > 0 && <InfoList text="Bonus Cards" list={bonus} />}</>
      )}
      {showResults && (
        <Button text={"Next"} color={"nextButton"} onClick={() => next()} />
      )}
    </div>
  );
};

export default CardSubSection;
