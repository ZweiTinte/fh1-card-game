import * as React from "react";

const Button = ({ text, color, onClick }: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className={color || ""}>
        {text}
      </button>
    </div>
  );
};

export default Button;
