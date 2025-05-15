import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post.tsx";
import style from "../../styles/Main.module.css";
import EncateResult from "../../components/EncateResult.tsx";
import TotalUser from "../../components/TotalUser.tsx";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as MainCharacter } from "../../assets/main_character.svg";
import { QRCodeCanvas } from "qrcode.react";
import TestResult from "../../components/TestResult.tsx";

const socket = io("http://localhost:3000"); // 배포 시 사용하는 주소로 변경

interface PostType {
  teacher: string;
  comment: string;
  image: string;
}

function Main() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = (e: Event) => {
    e.preventDefault();
    setClicked((prev: boolean) => !prev);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("/post");
        setPosts(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();

    socket.on("newPost", (post: PostType) => {
      setPosts((prevPosts: PostType[]) => [post, ...prevPosts]);
    });

    const handleWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === "QRButton") {
        handleClick(e);
        return;
      }
      setClicked(false);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      socket.off("newPost");
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <>
      <div className={style["Logo"]}>
        <Logo />
      </div>

      <div className={style["Body"]}>
        <h1>추구미 서비스 통계 ✨</h1>
        <div className={style["result-container"]}>
          <EncateResult />
          <TestResult />
          <TotalUser />
          <div className={style["test-mobile"]}>
            <p className={style["title"]}>추구미 선생님 찾으러 가기</p>
            <p>옆에 배치된 핸드폰으로 바로 추구미 찾기</p>
            <MainCharacter />
            <button id="QRButton">
              <img
                id="QRButton"
                src="/images/ToMobileButton.png"
                alt="toMobileButton"
              />
            </button>
          </div>
        </div>
        <div className={style["posts-container"]}>
          {posts.map((post: PostType, index: number) => {
            return <Post key={index} post={post} />;
          })}
        </div>

        <QRCodeCanvas
          className={style["QRContainer"]}
          style={{ display: clicked ? "block" : "none" }}
          value="http://localhost:3001"
        />
      </div>
    </>
  );
}

export default Main;
