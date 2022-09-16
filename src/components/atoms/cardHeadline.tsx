import * as React from "react";

const CardHeadline = ({ text, deckSize }: CardHeadlineProps) => {
  return (
    <div className="cardHeadline">
      <div>{text}</div>
      <div>{deckSize}</div>
    </div>
  );
};

export default CardHeadline;
