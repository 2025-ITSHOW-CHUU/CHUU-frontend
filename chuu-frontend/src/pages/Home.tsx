import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import Footer from "../components/Footer.tsx";
import def from "../styles/Default.module.css";
import style from "../styles/Home.module.css";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as MainCharacter } from "../assets/main_character.svg";

function Home({}) {
  const [search, setSearch] = useState("");

  const onChange = (value: string) => {
    setSearch(value);
    console.log(value);
  };

  return (
    <div className={`${def["Body"]}`}>
      <div className={`${def["Logo"]}`}>
        <Logo />
      </div>
      <SearchBar value={search} onChange={onChange} />
      <div className={`${style["MainCharacter"]}`}>
        <div>
          <p>나의 추구미 선생님 찾으러 가기 ✨</p>
        </div>
        <MainCharacter />
        <button>바로가기</button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
