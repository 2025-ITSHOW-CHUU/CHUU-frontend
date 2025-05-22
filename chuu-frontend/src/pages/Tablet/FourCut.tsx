import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/Photo.module.css";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";

function FourCut() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [frames, setFrames] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState<number | null>(null);
  const { getFourCutInfo } = useFourCutInfoStore();
  const selectFrame = getFourCutInfo();
  const navigate = useNavigate();

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
    canvas.width = 390;
    canvas.height = 500;
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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "48px",
          zIndex: 1000,
        }}
      >
        {count !== null && <div>{count}</div>}
      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          top: 20,
          width: "500px",
          height: "100vh",
          objectFit: "cover",
          display: "block",
        }}
      />
      <img
        src={frames[currentStep]}
        alt="frame"
        style={{
          position: "absolute",
          top: 20,
          width: "500px",
          height: "100vh",
        }}
      />
      <div className={style.CaptureContainer}>
        <img
          onClick={capturePhoto}
          className={style.CaptureButton}
          src="/images/SelfieButton.png"
          alt="SelfieButton"
          width="72px"
          height="72px"
        />
      </div>
    </div>
  );
}

export default FourCut;
