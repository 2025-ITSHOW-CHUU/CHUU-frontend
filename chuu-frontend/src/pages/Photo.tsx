import React, { useRef, useEffect, useState } from "react";

function PhotoBooth() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [framedPhoto, setFramedPhoto] = useState(null);
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
    if (photo) return;

    let video = videoRef.current;
    let tempCanvas = document.createElement("canvas");
    let ctx = tempCanvas.getContext("2d");

    tempCanvas.width = 400;
    tempCanvas.height = 600;
    ctx.drawImage(video, 0, 0, 400, 600);

    let imageURL = tempCanvas.toDataURL("image/png");
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
      {frames.map((frame, idx) => (
        <button key={idx} onClick={() => setFrameIdx(idx)}>
          Frame {idx + 1}
        </button>
      ))}
      <button onClick={generateFrame} disabled={!photo}>
        🎨 프레임 만들기
      </button>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
      {framedPhoto && (
        <button onClick={() => downloadFile(framedPhoto)}>📥 다운로드</button>
      )}
    </div>
  );
}

export default PhotoBooth;
