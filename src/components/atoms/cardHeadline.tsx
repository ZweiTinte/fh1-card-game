import * as React from "react";

const CardHeadline = ({ text, deckSize, infobox }: CardHeadlineProps) => {
  return (
    <div className={infobox ? "infoboxHeadline" : "cardHeadline"}>
      <div>{text}</div>
      <div>{deckSize || ""}</div>
    </div>
  );
};

export default CardHeadline;
