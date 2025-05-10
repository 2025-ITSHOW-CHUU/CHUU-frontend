import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import style from "../styles/TotalUser.module.css";

function TotalUser({}) {
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:3000/user"); // 서버 URL을 여기에 맞게 변경

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-totaluser", (data) => {
      console.log(data);
      setTotalUser(data.totalUser);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className={style.totalUser}>
      <h1>지금까지 참여한 추구미</h1>
      <p>옆에 배치된 핸드폰</p>
      <p>{totalUser}</p>
    </div>
  );
}

export default TotalUser;
