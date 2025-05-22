import React, { useState, useEffect } from "react";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";
import teachers from "../../assets/teachers.json";
import Hashtag from "../../components/Hashtag";
import axios from "axios";
import style from "../../styles/FourCutUpload.module.css";
import { useNavigate } from "react-router-dom";

type FourCutInfoType = {
  teacher: string;
  title: string;
  frames: string[];
  finalFrame: string;
};

type Teacher = {
  name: string;
  photo: string;
  personality: string;
  hashtags: string[];
  comment: string;
};

function FourCutUpload() {
  const { getFourCutInfo, getFourCutImage } = useFourCutInfoStore();
  const [fourCutInfo, setFourCutInfo] = useState<FourCutInfoType | null>(null);
  const [inputedComment, setInputedComment] = useState<string>("");
  const teachersInfo = teachers["teachers"];
  const navigate = useNavigate();
  const selectedTeacher = fourCutInfo
    ? teachersInfo.filter((teacher: Teacher) => {
        return teacher.name.split(" ")[0] === fourCutInfo.teacher;
      })[0]
    : teachersInfo[0];

  useEffect(() => {
    const savedInfo = getFourCutInfo();
    setFourCutInfo(savedInfo);
  }, []);

  // console.log(fourCutInfo);
  const handleSubmit = async () => {
    if (!getFourCutImage() || !(getFourCutImage() instanceof File)) {
      console.error(
        "이미지가 File 타입이 아니거나 존재하지 않음:",
        getFourCutImage()
      );
      alert("이미지를 다시 선택해주세요");
      return;
    }
    const formData = new FormData();
    formData.append("file", getFourCutImage());
    formData.append("teacher", fourCutInfo.teacher);
    formData.append("comment", inputedComment);
    try {
      const response = await axios.post(
        "http://localhost:3000/post/upload",
        formData
      );
      console.log(response);
      navigate("/web-main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.fourCutContainer}>
      <img src={URL.createObjectURL(getFourCutImage()!)} alt="Uploaded" />
      <div className={style.uploadContainer}>
        <p>{selectedTeacher.name}</p>
        <div className={style.hashtagsContainer}>
          {selectedTeacher["hashtags"].map((hashtag: string, index: number) => {
            return <Hashtag key={index} id={index} comment={hashtag} />;
          })}
        </div>
        <textarea
          placeholder="소감을 작성해주세요!"
          onChange={(e) => setInputedComment(e.target.value)}
          value={inputedComment}
          className={style.commentInputBox}
        />
        <button className={style.submitButton} onClick={() => handleSubmit()}>
          완료
        </button>
      </div>
    </div>
  );
}

export default FourCutUpload;
