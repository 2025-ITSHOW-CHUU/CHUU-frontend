import React, { useState, useEffect } from "react";
import style from "../styles/Post.module.css";
import Hashtag from "./Hashtag.tsx";
import teachers from "../assets/teachers.json";

type PostType = {
  teacher: string;
  comment: string;
  image: string;
};

type TeacherType = {
  name: string;
  photo: string;
  personality: string;
  hashtags: string[];
  comment: string;
};

function Post(props: { post: PostType }) {
  const teachersInfo: TeacherType[] = teachers["teachers"];
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(
    null
  );

  useEffect(() => {
    const teacher = teachersInfo.find((teacher) => {
      console.log(
        teacher.name.split(" ")[0] === props.post.teacher.split(" ")[0]
      );
      return teacher.name.split(" ")[0] === props.post.teacher.split(" ")[0];
    });
    console.log(teacher);
    if (teacher) {
      setSelectedTeacher(teacher);
    }
  }, [props.post.teacher]);

  return (
    <div className={style["post-container"]}>
      <img src={props.post.image} alt={props.post.image} />
      <div className={style.hashtagsContainer}>
        {selectedTeacher
          ? selectedTeacher["hashtags"].map(
              (hashtag: string, index: number) => (
                <Hashtag key={index} id={index} comment={hashtag} />
              )
            )
          : null}
      </div>
      <p>{props.post.comment}</p>
    </div>
  );
}

export default Post;
