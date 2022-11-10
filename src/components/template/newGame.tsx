import * as React from "react";
import { GameContext } from "../../contextProviders/gameContext";
import Headline from "../atoms/headline";

const NewGame = () => {
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const { game, setGame } = React.useContext(GameContext);
  const [deckSize, setDeckSize] = React.useState<number>(10);
  const [ai, setAi] = React.useState<string>("random");

  React.useEffect(() => {
    setTemplateReady(true);
  }, []);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setGame({ deckSize: deckSize });
    window.location.href = "game";
  };

  return (
    <>
      {templateReady && (
        <div className="gameLayout">
          <div className="formCard">
            <Headline text={"New Game"} style="formHeadline" />
            <form onSubmit={submitHandler}>
              <div className="formRow">
                <label className="formLabel" htmlFor="deckSize">
                  Decksize:
                </label>
                <input
                  id="deckSize"
                  value={deckSize}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setDeckSize(parseInt(e.target.value));
                    }
                  }}
                  type="number"
                  min={1}
                  max={99}
                />
              </div>
              <div className="formRow">
                <label className="formLabel" htmlFor="ai">
                  Opponent AI:
                </label>
                <select
                  id="ai"
                  value={ai}
                  className="select"
                  onChange={(e) => {
                    setAi(e.target.value);
                  }}
                >
                  <option selected value="random" className="selectOption">
                    Random
                  </option>
                </select>
              </div>
              <div className="formRow">
                <input type="submit" value="Start a new game" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewGame;
