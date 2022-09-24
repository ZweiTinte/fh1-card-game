import * as React from "react";
import Button from "../atoms/button";

const ButtonGroup = ({ buttons, disabled }: ButtonGroupProps) => {
  return (
    <div>
      {buttons.map((buttonData) => {
        return (
          <div className="buttonSpacer" key={buttonData.text}>
            <Button
              text={buttonData.text}
              onClick={disabled ? () => {} : buttonData.onClick}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
