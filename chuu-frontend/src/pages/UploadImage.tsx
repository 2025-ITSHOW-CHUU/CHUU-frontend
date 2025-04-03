import React from "react";
import useImageStore from "../store/useImageStore.ts";
import PageBar from "../components/PageBar.tsx";
import style from "../styles/UploadImage.module.css";
import def from "../styles/Default.module.css";
import teachers from "../assets/teachers.json";
import Hashtag from "../components/Hashtag.tsx";

type Teacher = {
  name: string;
  photo: string;
  personality: string;
  hashtags: string[];
  comment: string;
};

function UploadImage() {
  const { file, teacherName } = useImageStore();
  const teachersInfo = teachers["teachers"];
  const selectedTeacher = teachersInfo.filter(
    (teacher: Teacher) => teacher.name === teacherName + " 선생님"
  )[0];
  console.log(selectedTeacher);

  return (
    <div className={def.Body}>
      <div className={style.uploadImageContainer}>
        <PageBar pageName="추구미 게시물 올리기" />
        <img
          src={URL.createObjectURL(file!)}
          alt="Uploaded"
          className={style.uploadedImage}
        />
        <div className={style.hashtagsContainer}>
          {selectedTeacher["hashtags"].map((hashtag: string) => {
            return <Hashtag comment={hashtag} />;
          })}
        </div>
        <input
          type="text"
          placeholder="소감을 작성해주세요!"
          className={style.commentInputBox}
        />
      </div>
    </div>
  );
}

export default UploadImage;
