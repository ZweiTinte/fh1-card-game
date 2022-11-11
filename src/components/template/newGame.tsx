import { navigate } from "gatsby";
import * as React from "react";
import { GameContext } from "../../contextProviders/gameContext";
import Dropdown from "../atoms/dropdown";
import Headline from "../atoms/headline";
import NumberInput from "../atoms/numberInput";

const NewGame = () => {
  const { game, setGame } = React.useContext(GameContext);
  const [deckSize, setDeckSize] = React.useState<number>(game.deckSize);
  const [ai, setAi] = React.useState<string>("random");

  const aiList = [
    { id: 1, value: "random" },
    { id: 2, value: "other" },
  ];

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setGame({ deckSize: deckSize });
    navigate("game");
  };

  return (
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
              max={99}
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
  );
};

export default NewGame;
