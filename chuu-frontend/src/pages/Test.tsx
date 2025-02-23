import React from "react";
import def from "../styles/Default.module.css";
import style from "../styles/Test.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Questions from "../assets/questions.json";

type QuestionType = {
  question: string;
  options: string[];
  photo: string;
};

function Test() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(()=>{
    setQuestions(Questions.questions);
  }, []);

  const handleAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate("/result");
    }
  };

  const formattedQuestion = questions[currentQuestionIndex]?.question.split("\n").map((part, index) => (
    <span key={index}>
      {part}
      {index < questions[currentQuestionIndex].question.split("\n").length - 1 && <br />}
    </span>
  ));

  return(
    <div className={def.Body}>
      <div className={style.question}>
        <p>0{currentQuestionIndex+1}.</p>
        <p>{formattedQuestion}</p>
      </div>
      <img className={style.icon} src={questions[currentQuestionIndex]?.photo} alt={`${currentQuestionIndex}번 테스트 아이콘`}></img>
      <ul className={style.options}>
        {questions[currentQuestionIndex]?.options.map((option)=>{
          return <li className={style.option} onClick={handleAnswer}>{option}</li>
        })}
      </ul>
    </div>
  )

}

export default Test;