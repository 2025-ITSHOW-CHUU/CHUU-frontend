import React, { useRef, useEffect, useState } from "react";
import style from "../../styles/Photo.module.css";
import useImageStore from "../../store/useImageStore";
import { useNavigate } from "react-router-dom";

function PhotoBooth() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [framedPhoto, setFramedPhoto] = useState(null);
  const [toggle, setToggle] = useState(true);
  const { file, setFile, teacherName, setTeacherName } = useImageStore();
  const navigate = useNavigate();

  const frames = [
    "/images/SelfieHoyeonLee.png",
    "/images/frame1.png",
    "/images/frame2.png",
    "/images/frame3.png",
  ];
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

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null; // 스트림을 해제
    }
  };

  const capture = () => {
    let video = videoRef.current;
    let tempCanvas = document.createElement("canvas");
    let ctx = tempCanvas.getContext("2d");

    if (ctx) {
      tempCanvas.width = 390;
      tempCanvas.height = 844;

      ctx.scale(-1, 1);
      ctx.translate(-390, 0);

      ctx.drawImage(video, 0, 0, 390, 844);

      let imageURL = tempCanvas.toDataURL("image/png");

      setTeacherName("이호연");
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
  }, [photo, frameIdx]);

  useEffect(() => {
    getUserCamera();
  }, []);

  const generateFrame = () => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    canvas.width = 390;
    canvas.height = 844;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.src = photo;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 390, 844);

      let frame = new Image();
      frame.src = frames[frameIdx];
      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, 390, 844);
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

  const downloadFile = (url, fileName = "framed_photo.png") => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setToggle(!toggle);
  };

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
          display: toggle ? "block" : "none",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{ display: toggle ? "none" : "block" }}
      ></canvas>
      {/* 
      <img
        src={frames[frameIdx]}
        alt="Frame Preview"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: toggle ? "none" : "block",
        }}
      /> */}

      <div className={style.CaptureContainer}>
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
            }}
          />
        ) : (
          <div className={style.DownloadContainer}>
            <button onClick={() => navigate("/upload-post")}>
              게시물 올리기
            </button>
            <button onClick={() => downloadFile(framedPhoto)}>다운로드</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoBooth;
