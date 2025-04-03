import React from "react";
import style from "../styles/Hashtag.module.css";

function Hashtag(props: { comment: string }) {
  return (
    <div className={style.hashtagContainer}>
      <p>{props.comment}</p>
    </div>
  );
}

export default Hashtag;
