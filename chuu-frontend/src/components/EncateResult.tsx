import React, { useEffect, useState } from "react";
import style from "../styles/EncateResult.module.css";
import axios from "axios";
axios.defaults.withCredentials = true;

function EncateResult() {
  const [topResults, setTopResults] = useState({}); // 상태를 설정

  // 더미 데이터 (실제 데이터로 대체 가능)
  const surveyData = [
    { questionNumber: 1, question: "가장 결혼을 빨리할 거 같은 선생님은 1" },
    { questionNumber: 2, question: "가장 결혼을 빨리할 거 같은 선생님은 2" },
    { questionNumber: 3, question: "가장 결혼을 빨리할 거 같은 선생님은 3" },
    { questionNumber: 4, question: "가장 결혼을 빨리할 거 같은 선생님은 4" },
    { questionNumber: 5, question: "가장 결혼을 빨리할 거 같은 선생님은 5" },
  ];

  // 점수를 가져오는 함수
  const getScores = async () => {
    let updatedResults = {}; // 상태 업데이트를 위한 임시 객체

    for (let survey of surveyData) {
      const getScoreUrl = `http://localhost:3000/home/get/${survey["questionNumber"]}`;

      try {
        const response = await axios.get(getScoreUrl);
        const sortedScores = Object.entries(response["data"]["scores"]).sort(
          (a, b) => b[1] - a[1]
        );

        // 가장 높은 점수를 가진 사람을 업데이트
        updatedResults[survey["questionNumber"]] = {
          question: survey["question"],
          winner: sortedScores[0][0], // 1등 (이름)
          votes: sortedScores[0][1], // 1등 표수
        };
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    }

    setTopResults(updatedResults); // 상태 업데이트
  };

  // 1분마다 업데이트
  useEffect(() => {
    getScores(); // 첫 렌더링 시 실행
    const interval = setInterval(getScores, 60000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <div className={style["EncateResult"]}>
      <p>선생님 앙케이트 결과 ☀️</p>
      <ul>
        {Object.entries(topResults).map(([questionNumber, result]) => (
          <li key={questionNumber}>
            {result.question}
            <p>
              {result.winner} {result.votes}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EncateResult;
