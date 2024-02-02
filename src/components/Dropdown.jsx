import React from "react";
import countries from "../data";

export default function Dropdown({ id, selected, onChangeFn }) {
  return (
    <>
      <select
        name="dropdown"
        id={id}
        onChange={(event) => onChangeFn(event.target.value)}
      >
        {Object.entries(countries).map(([key, value]) => {
          let selectVal = key === selected ? "selected" : "";
          return (
            <option key={key} value={key} selected={selectVal}>
              {value}
            </option>
          );
        })}
      </select>
    </>
  );
}
