import React from "react";
import def from "../../styles/Default.module.css";
import style from "../../styles/Test.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Questions from "../../assets/questions.json";
import useTestScoreStore from "../../store/useTestScoreStore.ts";
import axios from "axios";

type QuestionType = {
  question: string;
  options: string[];
  photo: string;
};

type TestType = {
  testNumber: number;
  testScore: number;
};

function Test() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { scores, setScores, addScore } = useTestScoreStore();

  useEffect(() => {
    setQuestions(Questions.questions);
  }, []);

  const handleAnswer = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (currentQuestionIndex < questions.length - 1) {
      addScore(currentQuestionIndex, e.target.value);
      console.log(scores);
      setCurrentQuestionIndex((prev: number) => prev + 1);
    } else {
      try {
        await axios.post("http://localhost:3000/users", {
          score: scores?.reduce((a: number, c: TestType) => a + c.testScore, 0),
          type: "박지우",
        });
      } catch (e) {
        console.log(e);
        return;
      }
      navigate("/result");
      setScores([]);
    }
  };

  const formattedQuestion = questions[currentQuestionIndex]?.question
    .split("\n")
    .map((part, index) => (
      <span key={index}>
        {part}
        {index <
          questions[currentQuestionIndex].question.split("\n").length - 1 && (
          <br />
        )}
      </span>
    ));

  return (
    <div className={def.Body}>
      <div className={style.question}>
        <p>0{currentQuestionIndex + 1}.</p>
        <p>{formattedQuestion}</p>
      </div>
      <img
        className={style.icon}
        src={questions[currentQuestionIndex]?.photo}
        alt={`${currentQuestionIndex}번 테스트 아이콘`}
      ></img>
      <ul className={style.options}>
        {questions[currentQuestionIndex]?.options.map(
          (option: string, index: number) => {
            return (
              <li value={index} className={style.option} onClick={handleAnswer}>
                {option}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default Test;
