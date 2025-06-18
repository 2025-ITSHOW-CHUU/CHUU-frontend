import React, { useRef, useEffect, useState } from "react";
import style from "../../styles/Photo.module.css";
import useImageStore from "../../store/useImageStore";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

function PhotoBooth() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [framedPhoto, setFramedPhoto] = useState(null);
  const [toggle, setToggle] = useState(true);
  const { setFile } = useImageStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [inputedEmail, setInputedEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const frames = {
    "이호연 선생님": "/images/SelfieHoyeonLee.png",
    "박지우 선생님": "/images/SelfieJiwoo.png",
    "조예진 선생님": "/images/SelfieHoyeonLee.png",
    "김윤지 선생님": "/images/SelfieYunji.png",
    "이대형 선생님": "/images/SelfieDaehyeong.png",
    "정하나 선생님": "/images/SelfieHoyeonLee.png",
  };
  const [frameIdx, setFrameIdx] = useState(0);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/web-main"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null; // 스트림을 해제
    }
  };
  const base64ToFile = (base64: string, filename: string) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const sendImage = async () => {
    if (!framedPhoto) return;

    const file = base64ToFile(framedPhoto, "fourcut.png");

    const formData = new FormData();
    formData.append("email", inputedEmail);
    formData.append("image", file);
    formData.append("type", "selfie");

    await axios.post("https://chuu.mirim-it-show.site/upload/email", formData);
  };

  const capture = () => {
    let video = videoRef.current;
    let tempCanvas = document.createElement("canvas");
    let ctx = tempCanvas.getContext("2d");

    if (ctx) {
      tempCanvas.width = window.innerWidth;
      tempCanvas.height = window.innerHeight;

      ctx.scale(-1, 1);
      ctx.translate(-window.innerWidth, 0);

      ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);

      let imageURL = tempCanvas.toDataURL("image/png");

      setPhoto(imageURL);
    }
    stopCamera();
    setToggle(!toggle);
  };

  useEffect(() => {
    if (photo) {
      generateFrame();
    }
    if (videoRef.current) {
      getUserCamera();
    }

    if (location.state.type) {
      for (let i = 0; i < Object.keys(frames).length; i++) {
        if (location.state.type === Object.keys(frames)[i]) {
          setFrameIdx(i);
          break;
        }
      }
    }
  }, [photo, frameIdx]);

  useEffect(() => {
    getUserCamera();
  }, []);

  const generateFrame = () => {
    console.log(frames[location.state.type]);
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    canvas.width = 450;
    canvas.height = 600;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.src = photo;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 450, 600);

      let frame = new Image();
      frame.src = frames[location.state.type];

      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, 450, 600);
        setFramedPhoto(canvas.toDataURL("image/png"));
        const byteString = atob(canvas.toDataURL("image/png").split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: "image/png" });
        setFile(new File([blob], "photo.png"));
      };
    };
  };

  const downloadFile = (e: Event) => {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = framedPhoto;
    a.download = "chuu-photo";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const retry = () => {
    setPhoto(null);
    setFramedPhoto(null);
    setToggle(true);
    getUserCamera();
  };

  return (
    <div className={toggle ? style.VideoContainer : style.PhotoContainer}>
      <div className={style.HeaderContainer} onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          display: toggle ? "block" : "none",
          transform: "scaleX(-1)",
        }}
      />

      <img
        src={frames[location.state.type]}
        alt="frame"
        style={{
          position: "relative",
          left: 0,
          bottom: 0,
          width: "500px",
          height: "100vh",
          zIndex: 0, // frame 위
          pointerEvents: "none", // 클릭 방지!
          display: toggle ? "block" : "none",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          display: toggle ? "none" : "block",
          borderRadius: "20px",
          width: "100%",
          objectFit: "contain",
        }}
      ></canvas>

      <div
        className={toggle ? style.CaptureContainer : style.DownloadContainer}
      >
        {toggle ? (
          <img
            onClick={capture}
            className={style.CaptureButton}
            src="/images/SelfieButton.png"
            alt="SelfieButton"
            style={{
              width: "72px",
              height: "72px",
              backgroundColor: "translate",
              zIndex: 1000,
              position: "fixed",
              bottom: "30px",
              left: "calc(50% - 36px)",
            }}
          />
        ) : (
          <div className={style.DownloadContainer}>
            <button onClick={retry}>다시 찍기</button>
            <button onClick={(e) => downloadFile(e)}>다운로드</button>
            <button onClick={() => setOpenModal(true)}>
              이메일로 전송하기
            </button>
          </div>
        )}
      </div>

      {openModal && (
        <div
          className={style["modal-overlay"]}
          onClick={(e) => setOpenModal(false)}
        >
          <div
            className={style["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>츄 선생님 보내기</h2>
            <input
              type="email"
              value={inputedEmail}
              onChange={(e) => {
                setInputedEmail(e.target.value);
              }}
              className={style.modalInput}
              placeholder="이메일을 입력해 주세요."
            />
            <button
              onClick={() => {
                sendImage();
                setOpenModal(false);
              }}
              className={style.modalButton}
            >
              전송하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoBooth;
