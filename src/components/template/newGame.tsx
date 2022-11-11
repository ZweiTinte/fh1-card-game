import { navigate } from "gatsby";
import * as React from "react";
import { GameContext } from "../../contextProviders/gameContext";
import { fetchCarIDs } from "../../gameHelpers";
import Dropdown from "../atoms/dropdown";
import Headline from "../atoms/headline";
import NumberInput from "../atoms/numberInput";
import ErrorInfo from "../level1/errorInfo";

const NewGame = () => {
  const { game, setGame } = React.useContext(GameContext);
  const [deckSize, setDeckSize] = React.useState<number>(game.deckSize);
  const [ai, setAi] = React.useState<string>("random");
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [maxDeckSize, setMaxDeckSize] = React.useState<number>(game.deckSize);

  const aiList = [
    { id: 1, value: "random" },
    { id: 2, value: "other" },
  ];

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setGame({ deckSize: deckSize });
    navigate("game");
  };

  function handleError(error: Error): void {
    setError(true);
    setErrorMessage(error.message);
  }

  function resolveFetching(data: Array<CarData>): void {
    setMaxDeckSize(Math.floor(data.length / 2));
    setTemplateReady(true);
  }

  function newGame(): void {
    setTemplateReady(false);
    setError(false);
    setErrorMessage("");
    fetchCarIDs(resolveFetching, handleError);
  }

  React.useEffect(() => {
    newGame();
  }, []);

  return (
    <>
      {templateReady && (
        <div className="gameLayout">
          <div className="formCard">
            <Headline text={"New Game"} style="formHeadline" />
            <form onSubmit={submitHandler}>
              <div className="formRow">
                <label className="formLabel">Decksize:</label>
                <NumberInput
                  value={deckSize}
                  setValue={setDeckSize}
                  min={1}
                  max={maxDeckSize}
                />
              </div>
              <div className="formRow">
                <label className="formLabel">Opponent AI:</label>
                <Dropdown
                  dropDownItem={ai}
                  setDropdownItem={setAi}
                  dropDownData={aiList}
                />
              </div>
              <div className="formRow">
                <input type="submit" value="Start a new game" />
              </div>
            </form>
          </div>
        </div>
      )}
      {error && <ErrorInfo message={errorMessage} tryAgain={newGame} />}
    </>
  );
};

export default NewGame;
