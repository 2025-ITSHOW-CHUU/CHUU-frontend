import React, { useState, useEffect } from "react";
import style from "../styles/Post.module.css";

type PostType = {
  teacher: string;
  comment: string;
  image: string;
};

function Post(props: { post: PostType }) {
  return (
    <div className={style["post-container"]}>
      <image src={props.post.image} />
      <p>{props.post.comment}</p>
    </div>
  );
}

export default Post;
