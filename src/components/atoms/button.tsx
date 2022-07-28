import * as React from "react";

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

export default Button;
