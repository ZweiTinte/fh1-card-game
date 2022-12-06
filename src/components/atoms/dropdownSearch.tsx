import * as React from "react";
import { DropdownData, DropdownProps } from "./dropdown";

interface DropdownSearchProps extends DropdownProps {
  strictSearch?: boolean;
}

const DropdownSearch = ({
  dropDownItem,
  setDropdownItem,
  dropDownData,
  strictSearch = false,
}: DropdownSearchProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [filteredData, setFilteredData] =
    React.useState<DropdownData>(dropDownData);

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
      {open ? (
        <input
          type="text"
          className={`${
            filteredData.length > 0 ? "dropdownInput" : "dropdownEmpty"
          }`}
          onChange={(e) => {
            if (strictSearch) {
              setFilteredData(
                dropDownData.filter(function (i) {
                  return i.value.name.includes(e.target.value);
                })
              );
            } else {
              setFilteredData(
                dropDownData.filter(function (i) {
                  return i.value.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                })
              );
            }
          }}
          autoFocus
        />
      ) : (
        <div
          className="dropdown"
          onClick={() => {
            setOpen(true);
            setFilteredData(dropDownData);
          }}
        >
          {dropDownItem.name}
        </div>
      )}
      {open &&
        filteredData.map((item) => {
          return (
            <div
              className="dropdown"
              key={item.id}
              onClick={() => {
                setDropdownItem(
                  filteredData.filter(function (i) {
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

export default DropdownSearch;
