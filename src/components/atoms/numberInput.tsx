import * as React from "react";

const NumberInput = ({
  value,
  setValue,
  min,
  max,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
}) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(parseInt(e.target.value));
      }}
      type="number"
      min={min}
      max={max}
    />
  );
};

export default NumberInput;
