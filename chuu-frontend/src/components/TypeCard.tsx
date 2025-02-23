import React from "react";
import style from "../styles/TypeCard.module.css";

function TypeCard({key, name, photo, comment }){
  return(
    <div className={style.Card}>
      <img src={photo}></img>
      <div>
        <div className={style.name}>{name}</div>
        <div className={style.comment}>{comment}</div>
      </div>      
    </div>
  );
}

export default TypeCard;