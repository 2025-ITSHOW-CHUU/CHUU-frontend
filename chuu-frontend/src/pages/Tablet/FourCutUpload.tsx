import React, { useState } from "react";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";
import teachers from "../../assets/teachers.json";
import Hashtag from "../../components/Hashtag";
import axios from "axios";

type Teacher = {
  name: string;
  photo: string;
  personality: string;
  hashtags: string[];
  comment: string;
};

function FourCutUpload() {
  const { fourCutInfo, fourCutImage } = useFourCutInfoStore();
  console.log(fourCutImage);
  const [inputedComment, setInputedComment] = useState<string>("");
  const teachersInfo = teachers["teachers"];
  const selectedTeacher = teachersInfo.filter(
    (teacher: Teacher) => teacher.name === fourCutInfo.teacher + " 선생님"
  )[0];
  const handleSubmit = async () => {
    if (!fourCutImage || !(fourCutImage instanceof File)) {
      console.error(
        "이미지가 File 타입이 아니거나 존재하지 않음:",
        fourCutImage
      );
      alert("이미지를 다시 선택해주세요");
      return;
    }
    const formData = new FormData();
    formData.append("file", fourCutImage);
    formData.append("teacher", fourCutInfo.teacher);
    formData.append("comment", inputedComment);
    try {
      const response = await axios.post(
        "http://localhost:3000/post/upload",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <img src={URL.createObjectURL(fourCutImage!)} alt="Uploaded" />
      <div>
        {selectedTeacher["hashtags"].map((hashtag: string, index: number) => {
          return <Hashtag key={index} id={index} comment={hashtag} />;
        })}
      </div>
      <textarea
        placeholder="소감을 작성해주세요!"
        onChange={(e) => setInputedComment(e.target.value)}
        value={inputedComment}
      />
      <button onClick={() => handleSubmit()}>완료</button>
    </div>
  );
}

export default FourCutUpload;
