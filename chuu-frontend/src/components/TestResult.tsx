import { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/TestResult.module.css";
import Chart from "./Chart";
import { io } from "socket.io-client";

function TestResult() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://chuu.mirim-it-show.site/user");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-test", (res) => {
      setData(res);
      getQuestionResult();
    });

    async function getQuestionResult() {
      try {
        const res = await axios.get(
          "https://chuu.mirim-it-show.site/users/max"
        );
        console.log("res", res.data);
        const transformedData = res.data.map(
          (item: { id: string; teacherScore?: number }) => ({
            id: item.id + " 선생님",
            label: item.id + " 선생님",
            value: item.teacherScore ?? 0,
          })
        );
        console.log("formaedData", transformedData);
        setData(transformedData);
      } catch (err) {
        console.log(err);
      }
    }

    getQuestionResult();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={style.TestResultContainer}>
      <h1>민수님의 추구미 찾으러 가기</h1>
      <p>옆에 배치된 핸드폰으로 바로 추구미 찾기</p>
      <div style={{ width: 200, height: 200, padding: "0" }}>
        <Chart data={data} />
      </div>
    </div>
  );
}

export default TestResult;
