import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/PageBar.module.css";
import { IoIosArrowBack } from "react-icons/io";

function PageBar(props: { pageName: string }) {
  const navigate = useNavigate();

  return (
    <div className={style.PageBarContainer}>
      <IoIosArrowBack />
      <div className={style.pageNameContainer}>
        <p>{props.pageName}</p>
      </div>
    </div>
  );
}

export default PageBar;
