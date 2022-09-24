import * as React from "react";
import { EMPTY } from "../../consts";

const Button = ({ text, color, onClick }: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className={color}>
        {text}
      </button>
    </div>
  );
};

export default Button;
