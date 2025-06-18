import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/Fourcut.module.css";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { IoIosArrowBack } from "react-icons/io";

function FourCut() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [frames, setFrames] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState<number | null>(null);
  const { getFourCutInfo } = useFourCutInfoStore();
  const selectFrame = getFourCutInfo();
  const navigate = useNavigate();

  useEffect(() => {
    const isWideScreen = window.innerWidth >= 1024;

    if (!isWideScreen) {
      navigate("/"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = 470;
    canvas.height = 700;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameImg = new Image();
    frameImg.src = frames[currentStep];

    const dataUrl = canvas.toDataURL("image/png");
    const newPhotos = [...capturedPhotos, dataUrl];
    setCapturedPhotos(newPhotos);

    if (newPhotos.length === 4) {
      stopCamera();
      navigate("/four-cut-result", {
        state: { images: newPhotos },
      });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      capturePhoto(); // 카운트 끝났을 때 실행
      setCount(null); // 다시 초기화
      return;
    }
    const timer = setTimeout(() => {
      setCount((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    startCamera();
    setFrames(selectFrame.frames);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (count === null) {
          setCount(3);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      stopCamera();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={style.PhotoBoxContainer}>
      <div className={`${style["Logo"]}`}>
        <Logo />
      </div>
      <div className={style.CountdownContainer}>
        {count !== null && <div>{count}</div>}
      </div>

      <div className={style.VideoBoxContainer}>
        <video ref={videoRef} autoPlay playsInline className={style.Video} />
        <img src={frames[currentStep]} alt="frame" className={style.FrameImg} />
      </div>

      <div className={style.LineContainer}>
        <div
          className={style.Line}
          style={{ borderColor: currentStep < 1 ? "#f1f1f1" : "#65e9ff" }}
        ></div>
        <div
          className={style.Line}
          style={{ borderColor: currentStep < 2 ? "#f1f1f1" : "#65e9ff" }}
        ></div>
        <div
          className={style.Line}
          style={{ borderColor: currentStep < 3 ? "#f1f1f1" : "#65e9ff" }}
        ></div>
        <div
          className={style.Line}
          style={{ borderColor: currentStep < 4 ? "#f1f1f1" : "#65e9ff" }}
        ></div>
      </div>
      <button className={style.CaptureContainer} onClick={() => setCount(3)}>
        사진 찍기
      </button>
    </div>
  );
}

export default FourCut;
