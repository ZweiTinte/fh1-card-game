import { Link } from "gatsby";
import * as React from "react";
import { GameContext } from "../../contextProviders/gameContext";

const NewGame = () => {
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const { game, setGame } = React.useContext(GameContext);

  React.useEffect(() => {
    setGame({ deckSize: 20 });
    setTemplateReady(true);
  }, []);

  console.log(game);

  return <>{templateReady && <Link to="/game">Game</Link>}</>;
};

export default NewGame;
