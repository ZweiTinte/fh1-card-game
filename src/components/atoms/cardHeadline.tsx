import * as React from "react";

const CardHeadline = ({ text, deckSize, style }: CardHeadlineProps) => {
  return (
    <div className={style || "cardHeadline"}>
      <div>{text}</div>
      {deckSize && <div>{deckSize}</div>}
    </div>
  );
};

export default CardHeadline;
