import React from "react";
import style from "../styles/Hashtag.module.css";

function Hashtag(props: { key: number; id: number; comment: string }) {
  return (
    <div className={style.hashtagContainer} id={props.id}>
      <p>{props.comment}</p>
    </div>
  );
}

export default Hashtag;
