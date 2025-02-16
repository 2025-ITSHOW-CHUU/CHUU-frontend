import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import def from "../styles/Default.module.css";
import style from "../styles/Search.module.css";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { IoIosArrowBack } from "react-icons/io";

function Search({}) {
  const [search, setSearch] = useState("");

  const onChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className={`${def["Body"]}`}>
      <div className={`${def["Logo"]}`}>
        <Logo />
      </div>
      <div className={`${style["SearchDiv"]}`}>
        <IoIosArrowBack size="25px" />
        <SearchBar value={search} onChange={onChange} />
      </div>
    </div>
  );
}

export default Search;
