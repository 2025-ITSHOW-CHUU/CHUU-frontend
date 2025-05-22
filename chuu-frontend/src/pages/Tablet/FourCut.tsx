import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/Photo.module.css";
import { useLocation } from "react-router-dom";

function FourCut() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [frames, setFrames] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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
        state: { images: newPhotos, finalFrame: location.state.finalFrame },
      });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    startCamera();
    setFrames(location.state.frames);
    return () => stopCamera();
  }, []);

  console.log(frames);

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
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <img
        src={frames[currentStep]}
        alt="frame"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
