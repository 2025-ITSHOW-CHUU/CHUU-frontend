import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../components/Post";
import style from "../../styles/Main.module.css";
import EncateResult from "../../components/EncateResult";
import TotalUser from "../../components/TotalUser";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as MainCharacter } from "../../assets/main_character.svg";
import { QRCodeCanvas } from "qrcode.react";
import TestResult from "../../components/TestResult";
import ModalPortal from "../../components/ModalPortal";
import { useNavigate } from "react-router-dom";

const socket = io("https://chuu.mirim-it-show.site"); // 배포 시 사용하는 주소로 변경

interface PostType {
  teacher: string;
  comment: string;
  image: string;
}

function Main() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (e: Event) => {
    e.preventDefault();
    setClicked((prev: boolean) => !prev);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          "https://chuu.mirim-it-show.site/post"
        );
        setPosts(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();

    socket.on("newPost", (post: PostType) => {
      console.log(post);
      setPosts((prevPosts: PostType[]) => [post, ...prevPosts]);
    });

    return () => {
      socket.disconnect();
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
            <h1 className={style["title"]}>추구미 선생님 찾으러 가기</h1>
            <p>옆에 배치된 핸드폰으로 바로 추구미 찾기</p>
            <MainCharacter />
            <button
              id="QRButton"
              onClick={(e) => handleClick(e as unknown as Event)}
            >
              <img
                id="QRButton"
                src="/images/ToMobileButton.png"
                alt="toMobileButton"
              />
            </button>
          </div>
        </div>
        <div className={style.mirimFourCutTitle}>
          <h1>미림네컷 ✨</h1>
          <button onClick={() => navigate("/select-four-cut")}>
            미림네컷 찍기
          </button>
        </div>
        <div className={style["posts-container"]}>
          {posts.map((post: PostType, index: number) => {
            return <Post key={index} post={post} />;
          })}
        </div>

        {clicked && (
          <ModalPortal>
            <div
              className={style["modal-overlay"]}
              onClick={(e) => handleClick(e as unknown as Event)}
            >
              <div
                className={style["modal-content"]}
                onClick={(e) => e.stopPropagation()}
              >
                <QRCodeCanvas
                  className={style["QRContainer"]}
                  value="https://chuu.mirim-it-show.site"
                />
              </div>
            </div>
          </ModalPortal>
        )}
      </div>
    </>
  );
}

export default Main;
