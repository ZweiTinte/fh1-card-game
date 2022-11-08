import React from "react";
import { GatsbyBrowser } from "gatsby";
import { GameContextProvider } from "./contextProviders/gameContext";

const WrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return <GameContextProvider>{element}</GameContextProvider>;
};

export default WrapRootElement;
