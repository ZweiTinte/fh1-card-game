import * as React from "react";
import Button from "../atoms/button";

const ButtonGroup = ({ buttons }: ButtonGroupProps) => {
  return (
    <div>
      {buttons.map((buttonData) => {
        return (
          <div className="buttonSpacer">
            <Button text={buttonData.text} onClick={buttonData.onClick} />
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
