import React from "react";
import style from "../styles/Hashtag.module.css";

function Hashtag(props: { key: number; comment: string }) {
  return (
    <div className={style.hashtagContainer} key={props.key}>
      <p>{props.comment}</p>
    </div>
  );
}

export default Hashtag;
