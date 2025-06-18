import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import style from "../styles/TotalUser.module.css";
import axios from "axios";

function TotalPosts({}) {
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    const socket = io("https://chuu.mirim-it-show.site/user"); // 서버 URL을 여기에 맞게 변경

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-totaluser", (data) => {
      console.log(data);
      setTotalUser(data.totalUser);
    });

    async function getTotalUser() {
      const res = await axios.get("https://chuu.mirim-it-show.site/users");
      return res;
    }

    getTotalUser()
      .then((res) => setTotalUser(res.data))
      .catch((err) => console.error(err));

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className={style.totalUser}>
      <h1>지금까지 참여한 게시글</h1>
      <p>츄네컷을 찍어 숫자를 올려주세요!</p>
      <p className={style.postNum}>{totalUser}</p>
    </div>
  );
}

export default TotalPosts;
