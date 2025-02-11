import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";

function Home({}) {
  const [search, setSearch] = useState("");

  const onChange = (value: string) => {
    setSearch(value);
    console.log(value);
  };

  return <SearchBar value={search} onChange={onChange} />;
}

export default Home;
