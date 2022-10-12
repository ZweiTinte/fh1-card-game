import * as React from "react";

const Headline = ({ text, deckSize, style }: HeadlineProps) => {
  return (
    <div className={style || "headline"}>
      <>{text}</>
      {deckSize && <div>{deckSize}</div>}
    </div>
  );
};

export default Headline;
