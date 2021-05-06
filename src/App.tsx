import React, { useState } from "react";
import "./App.scss";
import data from "./data.json";
import Sort, { Option } from "./Sort";
import Result, { IResult } from "./Result";

export type SortFn = (a: IResult, b: IResult) => number;
const sortByName = (a: IResult, b: IResult) => a.name.localeCompare(b.name);
const sortByPrice = (a: IResult, b: IResult) => b.price - a.price;
const sortByRating = (a: IResult, b: IResult) => b.rating - a.rating;

const sortOptions: Option[] = [
  {
    name: (
      <>
        sort <strong>alphabetically</strong>
      </>
    ),
    sortFn: sortByName,
  },
  {
    name: (
      <>
        sort by <strong>price</strong>
      </>
    ),
    sortFn: sortByPrice,
  },
  {
    name: (
      <>
        sort by <strong>rating</strong>
      </>
    ),
    sortFn: sortByRating,
  },
];

function App() {
  const [sortBy, setSortBy] = useState<SortFn>(() => sortByPrice);

  return (
    <div className="App">
      <div className="App__sidebar">
        <Sort
          options={sortOptions.map((so) => {
            return {
              ...so,
              selected: so.sortFn === sortBy,
            };
          })}
          onClick={(option) => setSortBy(() => option.sortFn)}
        />
      </div>
      <div className="App__content">
        {data.sort(sortBy).map((holiday) => (
          <Result key={holiday.ID} {...holiday} />
        ))}
      </div>
    </div>
  );
}

export default App;
