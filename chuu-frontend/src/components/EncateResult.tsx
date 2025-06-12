import React, { useEffect, useState } from "react";
import style from "../styles/EncateResult.module.css";
import axios from "axios";
import encate from "../assets/encate.json";
import { io } from "socket.io-client";
axios.defaults.withCredentials = true;

type SurveyType = {
  question: string;
  votes: number;
  winner: string;
};

function EncateResult() {
  const [topResults, setTopResults] = useState<Record<string, SurveyType>>({});
  const getScores = async () => {
    // 일부 점수 보여주기 -> 전체 점수 보여주기
    let updatedResults = {};
    const surveyData = encate.encate;

    for (let survey of surveyData) {
      const getScoreUrl = ` https://chuu.mirim-it-show.site/home/${
        survey["questionNumber"] - 1
      }`;

      try {
        const response = await axios.get(getScoreUrl);
        const sortedScores = Object.entries(response["data"]["scores"]).sort(
          (a: { [key: string]: any }, b: { [key: string]: any }) => b[1] - a[1]
        );
        updatedResults[survey["questionNumber"]] = {
          question: survey["question"],
          winner: sortedScores[0][0] + " 선생님",
          votes: sortedScores[0][1],
        };
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    }
    console.log(topResults);
    setTopResults(updatedResults);
  };

  useEffect(() => {
    getScores();

    const socket = io("https://chuu.mirim-it-show.site/user");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-encate", (data) => {
      setTopResults((prev) => ({
        ...prev,
        [data.questionNumber + 1]: {
          question: encate.encate[data.questionNumber].question,
          winner: data.teacherName,
          votes: data.maxVotedTeacher,
        },
      }));
    });

    const interval = setInterval(getScores, 60000);
    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={style["EncateResult"]}>
      <p>선생님 앙케이트 결과 ☀️</p>
      <ul>
        {(Object.entries(topResults) as [string, SurveyType][]).map(
          ([questionNumber, result]) => (
            <li key={questionNumber}>
              {result.question}
              <p>
                {result.winner} {result.votes}
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default EncateResult;
