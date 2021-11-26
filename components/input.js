import React from "react";

export default function Input(props) {
  const options = props.options.map((option) => (
    <option key={option.id}>{option.Name}</option>
  ));
  return (
    <div>
      <select>{options}</select>
    </div>
  );
}
