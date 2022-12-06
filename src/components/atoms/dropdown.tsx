import * as React from "react";

export type DropdownData = Array<{ id: number; value: Ai }>;

export interface DropdownProps {
  dropDownItem: Ai;
  setDropdownItem: React.Dispatch<React.SetStateAction<Ai>>;
  dropDownData: DropdownData;
}

const Dropdown = ({
  dropDownItem,
  setDropdownItem,
  dropDownData,
}: DropdownProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

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

  return (
    <div
      className={`colLayout dropdownBorder ${open ? "priority" : ""}`}
      ref={ref}
    >
      <div className="dropdown" onClick={() => setOpen(!open)}>
        {dropDownItem.name}
      </div>
      {open &&
        dropDownData.map((item) => {
          return (
            <div
              className="dropdown"
              key={item.id}
              onClick={() => {
                setDropdownItem(
                  dropDownData.filter(function (i) {
                    return i.value.name === item.value.name;
                  })[0].value
                );
                setOpen(false);
              }}
            >
              {item.value.name}
            </div>
          );
        })}
    </div>
  );
};

export default Dropdown;
