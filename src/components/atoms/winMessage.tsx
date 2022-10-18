import * as React from "react";

const WinMessage = ({ style, result }: WinMessageProps) => {
  const resultMessages = ["You lose!", "You win!", "Draw!"];

  return <div className={style}>{resultMessages[result]}</div>;
};

export default WinMessage;
