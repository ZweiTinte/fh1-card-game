import * as React from "react";

const Image = ({ src, alt }: ImageProps) => {
  return <img className="image" src={src} alt={alt} />;
};

export default Image;
