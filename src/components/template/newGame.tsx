import { navigate } from "gatsby";
import * as React from "react";
import { GameContext } from "../../contextProviders/gameContext";
import Headline from "../atoms/headline";

const NewGame = () => {
  const [templateReady, setTemplateReady] = React.useState<boolean>(false);
  const { game, setGame } = React.useContext(GameContext);
  const [deckSize, setDeckSize] = React.useState<number>(game.deckSize);
  const [ai, setAi] = React.useState<string>("random");
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const aiList = [
    { id: 1, value: "random" },
    { id: 2, value: "other" },
  ];

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

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
            <div className="colLayout" ref={ref}>
              <div
                className={open ? "openDropdown" : "dropdown"}
                onClick={() => setOpen(!open)}
              >
                {ai}
              </div>
              {open &&
                aiList.map((item) => {
                  return (
                    <div
                      className={
                        item.id === aiList.length
                          ? "lastDropdownOption"
                          : "dropdownOption"
                      }
                      key={item.id}
                      onClick={() => {
                        setAi(item.value);
                        setOpen(false);
                      }}
                    >
                      {item.value}
                    </div>
                  );
                })}
            </div>
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
