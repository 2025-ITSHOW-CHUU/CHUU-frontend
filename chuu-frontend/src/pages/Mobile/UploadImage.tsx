import React, { useState, useEffect } from "react";
import useImageStore from "../../store/useImageStore";
import PageBar from "../../components/PageBar";
import style from "../../styles/UploadImage.module.css";
import def from "../../styles/Default.module.css";
import teachers from "../../assets/teachers.json";
import Hashtag from "../../components/Hashtag";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Teacher = {
  name: string;
  photo: string;
  personality: string;
  hashtags: string[];
  comment: string;
};

function UploadImage() {
  const navigate = useNavigate();
  const usePreventRefresh = () => {
    const preventClose = (e: any) => {
      e.preventDefault();
      e.returnValue = "";
    };

    useEffect(() => {
      (() => {
        window.addEventListener("beforeunload", preventClose);
      })();

      return () => {
        window.removeEventListener("beforeunload", preventClose);
      };
    });
  };

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/web-main"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  usePreventRefresh();
  const { file, teacherName } = useImageStore();
  const teachersInfo = teachers["teachers"];
  const selectedTeacher = teachersInfo.filter(
    (teacher: Teacher) => teacher.name === teacherName + " 선생님"
  )[0];
  const [comment, setComment] = useState("");

  console.log(selectedTeacher);

  const handleSubmit = async () => {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("teacher", selectedTeacher.name);
      formData.append("comment", comment);

      try {
        await axios.post(
          "https://chuu.mirim-it-show.site/post/upload",
          formData
        );
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          {selectedTeacher["hashtags"].map((hashtag: string, index: number) => {
            return <Hashtag key={index} id={index} comment={hashtag} />;
          })}
        </div>
        <textarea
          placeholder="소감을 작성해주세요!"
          className={style.commentInputBox}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </div>
      <button className={style.submitButton} onClick={handleSubmit}>
        완료
      </button>
    </div>
  );
}

export default UploadImage;
