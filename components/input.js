import React from "react";

export default function Input(props) {
  const options = props.options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.Name}
    </option>
  ));
  return (
    <div>
      <select onChange={(event) => props.selectHandler(event.target.value)}>
        {options}
      </select>
    </div>
  );
}
