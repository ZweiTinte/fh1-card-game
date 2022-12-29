import * as React from "react";

interface MultiselectProps {
  dropDownItems: string[];
  setDropdownItems: React.Dispatch<React.SetStateAction<string[]>>;
  dropDownData: { id: number; value: string }[];
}

const Multiselect = ({
  dropDownItems,
  setDropdownItems,
  dropDownData,
}: MultiselectProps) => {
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
        Selected: {dropDownItems.length}
      </div>
      {open &&
        dropDownData.map((item) => {
          return (
            <div
              className={
                dropDownItems.includes(item.value) ? "selectedItem" : "dropdown"
              }
              key={item.id}
              onClick={() => {
                let newDropdownItems = dropDownItems;
                if (dropDownItems.includes(item.value)) {
                  newDropdownItems = newDropdownItems.filter(function (i) {
                    return i !== item.value;
                  });
                } else {
                  newDropdownItems = newDropdownItems.concat([item.value]);
                }
                setDropdownItems(newDropdownItems);
              }}
            >
              {item.value}
            </div>
          );
        })}
    </div>
  );
};

export default Multiselect;
