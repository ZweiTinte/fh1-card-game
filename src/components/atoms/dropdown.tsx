import * as React from "react";

interface DropdownProps {
  dropDownItem: string;
  setDropdownItem: React.Dispatch<React.SetStateAction<string>>;
  dropDownData: Array<{ id: number; value: string }>;
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
    <div className="colLayout dropdownBorder" ref={ref}>
      <div className="dropdown" onClick={() => setOpen(!open)}>
        {dropDownItem}
      </div>
      {open &&
        dropDownData.map((item) => {
          return (
            <div
              className="dropdownOption"
              key={item.id}
              onClick={() => {
                setDropdownItem(item.value);
                setOpen(false);
              }}
            >
              {item.value}
            </div>
          );
        })}
    </div>
  );
};

export default Dropdown;
