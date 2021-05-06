import React from "react";
import { SortFn } from "./App";

export type Option = {
  name: React.ReactNode;
  sortFn: SortFn;
  selected?: boolean;
};

type Props = {
  options: Option[];
  onClick: (option: Option) => void;
};
function Sort({ options, onClick }: Props) {
  return (
    <ul className="Sort">
      {options.map((option, i) => (
        <li key={i}>
          <button
            className={option.selected ? "selected" : ""}
            onClick={() => onClick(option)}
          >
            {option.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Sort;
