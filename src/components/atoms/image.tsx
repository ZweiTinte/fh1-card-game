import * as React from "react";

const Image = ({ src, alt }: ImageProps) => {
  console.log(src, alt);
  return (
    <div>
      <img className="image" src={src} alt={alt} />
    </div>
  );
};

export default Image;
