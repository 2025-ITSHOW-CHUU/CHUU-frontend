import React, { useRef, useEffect, useState } from "react";

function PhotoBooth() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

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
    if (photo) return;

    let video = videoRef.current;
    let tempCanvas = document.createElement("canvas");
    let ctx = tempCanvas.getContext("2d");

    tempCanvas.width = 400;
    tempCanvas.height = 600;
    ctx.drawImage(video, 0, 0, 400, 600);

    let imageURL = tempCanvas.toDataURL("image/png"); // 이미지 저장
    setPhoto(imageURL);
  };

  const generateFrame = () => {
    if (!photo) return;

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
      frame.src = "/images/frame.png";
      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, 400, 600);
      };
    };
  };

  useEffect(() => {
    getUserCamera();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: "300px" }} />
      <button onClick={capture} disabled={photo !== null}>
        📸 캡처
      </button>
      <button onClick={generateFrame} disabled={!photo}>
        🎨 프레임 만들기
      </button>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
    </div>
  );
}

export default PhotoBooth;
