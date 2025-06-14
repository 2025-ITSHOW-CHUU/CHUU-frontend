import React from "react";
import style from "../styles/SearchBar.module.css";
import { IoSearchOutline } from "react-icons/io5";

function SearchBar(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  const isActive = props.value.length > 0;

  return (
    <div className={style.SearchContainer}>
      <IoSearchOutline
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "#d1d2d1",
        }}
      />
      <label
        className={`${style.FloatingLabel} ${isActive ? style.active : ""}`}
      >
        나의 추구미 선생님을 검색해 보세요!
      </label>
      <input
        type="text"
        className={style.SearchInput}
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
