import * as React from "react";

const Image = ({ src, alt }: ImageProps) => {
  return (
    <div>
      <img className="image" src={src} alt={alt} />
    </div>
  );
};

export default Image;
