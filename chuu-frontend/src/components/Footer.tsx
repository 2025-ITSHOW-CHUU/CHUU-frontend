import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { BsChatRightHeartFill } from "react-icons/bs";
import style from "../styles/Footer.module.css";
import { useNavigate } from "react-router-dom";

function Footer({}) {
  const navigate = useNavigate();
  const handleClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target);
    navigate(`/${e.target!.id}`);
  };
  return (
    <div className={`${style["Footer"]}`}>
      <div className="home" id="" onClick={(e: Event) => handleClick(e)}>
        <GoHomeFill />
        <p id="">홈</p>
      </div>
      <div
        className="search"
        id="search"
        onClick={(e: Event) => handleClick(e)}
      >
        <FiSearch />
        <p id="search">검색</p>
      </div>
      <div className="test" id="test" onClick={(e: Event) => handleClick(e)}>
        <FaClipboardList />
        <p id="test">테스트</p>
      </div>
      <div className="chat" id="chatbot" onClick={(e: Event) => handleClick(e)}>
        <BsChatRightHeartFill />
        <p id="chatbot">채팅</p>
      </div>
    </div>
  );
}

export default Footer;
