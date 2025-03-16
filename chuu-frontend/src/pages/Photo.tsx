import React, { useRef, useEffect, useState } from "react";
import style from "../styles/Photo.module.css";

function PhotoBooth() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [framedPhoto, setFramedPhoto] = useState(null);
  const [toggle, setToggle] = useState(true);

  const frames = [
    "/images/frame.png",
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

  const capture = () => {
    let video = videoRef.current;
    let tempCanvas = document.createElement("canvas");
    let ctx = tempCanvas.getContext("2d");

    if (ctx) {
      tempCanvas.width = 400;
      tempCanvas.height = 600;

      // 좌우 반전 적용
      ctx.scale(-1, 1);
      ctx.translate(-400, 0);

      ctx.drawImage(video, 0, 0, 400, 600);

      let imageURL = tempCanvas.toDataURL("image/png");
      setPhoto(imageURL);
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    if (photo) {
      generateFrame();
    }
  }, [photo, frameIdx]);

  const generateFrame = () => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 600;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.src = photo;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 400, 600);

      let frame = new Image();
      frame.src = frames[frameIdx];
      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, 400, 600);
        setFramedPhoto(canvas.toDataURL("image/png"));
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

  useEffect(() => {
    getUserCamera();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <img
        src={frames[frameIdx]}
        alt="Frame Preview"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      <div className={style.CaptureContainer}>
        {toggle ? (
          <button onClick={capture}>📸 캡처</button>
        ) : (
          <button onClick={() => downloadFile(framedPhoto)}>📥 다운로드</button>
        )}
        {frames.map((frame, idx) => (
          <button key={idx} onClick={() => setFrameIdx(idx)}>
            Frame {idx + 1}
          </button>
        ))}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}

export default PhotoBooth;
