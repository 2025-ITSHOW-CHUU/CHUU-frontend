import React from "react";
import def from "../../styles/Default.module.css";
import style from "../../styles/Test.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Questions from "../../assets/questions.json";
import useTestScoreStore from "../../store/useTestScoreStore";
import axios from "axios";

type OptionType = { q: string; score: number };

type QuestionType = {
  question: string;
  options: { q: string; score: number }[];
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

  function getType(score) {
    if (score <= 8) return "박지우 선생님";
    if (score <= 12) return "이호연 선생님";
    if (score <= 16) return "정하나 선생님";
    if (score <= 20) return "이대형 선생님";
    if (score <= 24) return "김윤지 선생님";
    return "조예진 선생님";
  }  

  const handleAnswer = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (currentQuestionIndex < questions.length - 1) {
      addScore(currentQuestionIndex, e.target.value);
      console.log(scores);
      setCurrentQuestionIndex((prev: number) => prev + 1);
    } else {

      const totalScore = scores?.reduce((a: number, c: TestType) => a + c.testScore, 0) + e.target.value;
      const type = getType(totalScore);

      try {
        await axios.post("http://localhost:3000/users", {
          score: totalScore,
          type: type,
        });
      } catch (e) {
        console.log(e);
        return;
      }
      navigate("/result", {
        state: {
          type: type,
        },
      });
      
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
          (option: OptionType, index: number) => {
            return (
              <li
                value={option.score}
                className={style.option}
                onClick={handleAnswer}
              >
                {option.q}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default Test;
