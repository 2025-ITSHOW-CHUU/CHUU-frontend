import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import EncateResult from "../../components/EncateResult";
import def from "../../styles/Default.module.css";
import style from "../../styles/Home.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as MainCharacter } from "../../assets/main_character.svg";
import { ReactComponent as Widget } from "../../assets/widget.svg";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const onClick = (dir: string) => () => {
    navigate(dir);
  };

  const handleChatWidgetClick = async () => {
    navigate("/chatbot");
  };

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/web-main"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  return (
    <div className={`${def["Body"]}`}>
      <div className={`${def["Logo"]}`}>
        <Logo />
      </div>
      <div onClick={onClick("/search")} className={`${style["SearchDiv"]}`}>
        <SearchBar value={search} onChange={onChange} />
      </div>
      <div onClick={onClick("/test")} className={`${style["MainCharacter"]}`}>
        <div>
          <p>나의 추구미 선생님 찾으러 가기 ✨</p>
        </div>
        <MainCharacter />
        <button>바로가기</button>
      </div>
      <button
        onClick={onClick("/encate")}
        className={`${style["EnCateButton"]}`}
      >
        <p>선생님 앙케이트 하러가기</p>
        <IoIosArrowForward />
      </button>
      <EncateResult />
      {/* 채팅 위젯 */}
      <div className={style["chatWidgetContainer"]}>
        <div className={style["chatBubbleWrapper"]}>
          <div className={style["chatBubble"]}>
            선생님 AI와 대화해 보세요!
            <div className={style["chatTail"]}></div>
          </div>
          <div
            className={`${style["chatIcon"]}`}
            onClick={handleChatWidgetClick}
          >
            <Widget />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
