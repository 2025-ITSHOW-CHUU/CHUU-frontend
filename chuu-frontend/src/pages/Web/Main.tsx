import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";

const socket = io("http://localhost:3000"); // 배포 시 사용하는 주소로 변경

function Main({}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    socket.on("newPost", (post) => {
      setPosts((post) => [post, ...posts]);
    });

    return () => {
      socket.off("newPost");
    };
  }, []);

  return (
    <div>
      {posts.map((p) => (
        <div key={p.image}>{p.comment}</div>
      ))}
    </div>
  );
}

export default Main;
