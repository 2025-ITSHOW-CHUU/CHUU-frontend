import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import Footer from "../components/Footer.tsx";
import style from "../styles/Default.module.css";

function Home({}) {
  const [search, setSearch] = useState("");

  const onChange = (value: string) => {
    setSearch(value);
    console.log(value);
  };

  return (
    <div className={`${style["Body"]}`}>
      <SearchBar value={search} onChange={onChange} />
      <Footer />
    </div>
  );
}

export default Home;
