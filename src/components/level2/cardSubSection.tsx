import * as React from "react";
import Button from "../atoms/button";
import InfoList from "../level1/infoList";

const CardSubSection = ({ showResults, bonus, next }: CardSubSectionProps) => {
  return (
    <div className="gameLayout">
      {showResults ? (
        <Button text={"Next"} color={"nextButton"} onClick={() => next()} />
      ) : (
        <>{bonus.length > 0 && <InfoList text="Bonus Cards" list={bonus} />}</>
      )}
    </div>
  );
};

export default CardSubSection;
