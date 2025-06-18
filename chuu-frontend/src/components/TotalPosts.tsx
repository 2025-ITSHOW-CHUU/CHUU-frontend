import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import style from "../styles/TotalUser.module.css";
import axios from "axios";

function TotalPosts({}) {
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const socket = io("https://chuu.mirim-it-show.site/user"); // 서버 URL을 여기에 맞게 변경

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-totalposts", (data) => {
      setTotalPosts(data.totalposts);
    });

    async function getTotalUser() {
      const res = await axios.get("https://chuu.mirim-it-show.site/post/num");
      return res;
    }

    getTotalUser()
      .then((res) => setTotalPosts(res.data.data))
      .catch((err) => console.error(err));

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className={style.totalUser}>
      <h1>지금까지 참여한 게시글</h1>
      <p>츄네컷을 찍어 숫자를 올려주세요!</p>
      <p className={style.postNum}>{totalPosts}</p>
    </div>
  );
}

export default TotalPosts;
