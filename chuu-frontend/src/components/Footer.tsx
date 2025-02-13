import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { BsChatRightHeartFill } from "react-icons/bs";
import style from "../styles/Footer.module.css";

function Footer({}) {
  return (
    <div className={`${style["Footer"]}`}>
      <div className="home">
        <GoHomeFill />
        <p>홈</p>
      </div>
      <div className="search">
        <FiSearch />
        <p>검색</p>
      </div>
      <div className="test">
        <FaClipboardList />
        <p>테스트</p>
      </div>
      <div className="chat">
        <BsChatRightHeartFill />
        <p>채팅</p>
      </div>
    </div>
  );
}

export default Footer;
