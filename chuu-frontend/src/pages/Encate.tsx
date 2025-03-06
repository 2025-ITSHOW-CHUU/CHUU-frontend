import React, { useEffect, useState } from "react";
import encate from "../assets/encate.json";
import style from "../styles/Encate.module.css";
import def from "../styles/Default.module.css";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type QuestionType = {
  question: string;
  teacher: string[];
};

function Encate() {
  const [encateQuestion, setEncateQuestion] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setEncateQuestion(encate.encate);
  }, []);

  const handleAnswer = async (teacher: string) => {
    if (currentQuestionIndex < encateQuestion.length) {
      setCurrentQuestionIndex((prev: number) => prev + 1);

      const voteUrl = "http://localhost:3000/home";

      try {
        const response = await axios.post(voteUrl, {
          questionNumber: currentQuestionIndex,
          teacherName: teacher,
        });
        console.log(response);
      } catch (error) {
        console.log("앙케이드 투표 오류:", error);
      }
    }
  };

  const formattedQuestion = encateQuestion[currentQuestionIndex]?.question
    .split("\n")
    .map((part, index) => (
      <span key={index}>
        {part}
        {index <
          encateQuestion[currentQuestionIndex].question.split("\n").length -
            1 && <br />}
      </span>
    ));

  const backButton = () => {
    navigate(-1);
  };
  return (
    <div className={`${def["Body"]} ${style["EncateContainer"]}`}>
      <div className={`${style["BackContainer"]}`} onClick={backButton}>
        <IoIosArrowBack size="30px" />
      </div>
      <div className={`${style["TitleDiv"]}`}>
        <p>{`${currentQuestionIndex + 1}`}.</p>
        <p>{formattedQuestion}</p>
      </div>
      <div className={`${style["EncateDiv"]}`}>
        {encateQuestion[currentQuestionIndex]?.teacher.map(
          (teacher: string, i: number) => (
            <button
              key={i}
              className={style.option}
              onClick={() => {
                handleAnswer(teacher);
              }}
            >
              {teacher} 선생님
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Encate;
