import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post.tsx";
import style from "../../styles/Main.module.css";
import EncateResult from "../../components/EncateResult.tsx";
import TotalUser from "../../components/TotalUser.tsx";

// const socket = io("http://localhost:3000"); // 배포 시 사용하는 주소로 변경

interface PostType {
  teacher: string;
  comment: string;
  image: string;
}

function Main() {
  const [posts, setPosts] = useState<PostType[]>([]);
  // console.log(posts.data);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get<PostType[]>("/post");
        setPosts(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();

    // socket.on("newPost", (post: PostType) => {
    //   setPosts((prevPosts) => [post, ...prevPosts]);
    // });

    // return () => {
    //   socket.off("newPost");
    // };
  }, []);

  return (
    <>
      <div className={style["result-container"]}>
        <EncateResult />
        <TotalUser />
      </div>
      <div className={style["posts-container"]}>
        {posts.map((post: PostType) => {
          return <Post post={post} />;
        })}
      </div>
    </>
  );
}

export default Main;
