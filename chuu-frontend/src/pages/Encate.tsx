import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import encate from "../assets/encate.json";
import def from "../styles/Default.module.css";
import style from "../styles/Encate.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Encate({}) {
  const [questionNo, setQuestionNo] = useState("");
  const [question, setQuestion] = useState("");
  const [teachers, setTeachers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/");
    const questionJson = encate.encate[parseInt(path[path.length - 1])];

    setQuestionNo(questionJson.questionNumber.toString().padStart(2, "0"));
    setQuestion(questionJson.question);
    setTeachers(questionJson.teacher);
  }, [location]);

  const vote = async (id: number) => {
    const answeredNumber = questionNo;
    const answeredTeacehr = teachers[id];
    const voteUrl = `http://localhost:3000/home`;

    try {
      const response = await axios.post(voteUrl, {
        questionNumber: answeredNumber,
        teacherName: answeredTeacehr,
      });
      console.log(response);
    } catch (error) {
      console.log("앙케이드 투표 실패:", error);
    }
  };

  const returnBack = () => {
    navigate("/encate");
  };

  return (
    <div className={`${def["Body"]}`}>
      <div onClick={returnBack} className={`${style["IconDiv"]}`}>
        <IoIosArrowBack size="40px" />
      </div>
      <div className={`${style["EncateContainer"]}`}>
        <div className={`${style["TitleDiv"]}`}>
          <h2>{questionNo}.</h2>
          <h2>{question}</h2>
        </div>
        <div className={`${style["EncateDiv"]}`}>
          {teachers.map((teacher: string, i: number) => {
            return (
              <button key={i} id={i} onClick={() => vote(i)}>
                {teacher} 선생님
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Encate;
