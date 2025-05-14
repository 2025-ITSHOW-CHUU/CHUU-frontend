import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import style from "../styles/SearchBar.module.css";

function SearchBar(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const onChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    props.onChange(target.value);
  };

  return (
    <div className={`${style["SearchBar"]}`}>
      <IoSearchOutline />
      <input
        className={`${style["SearchInput"]}`}
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
