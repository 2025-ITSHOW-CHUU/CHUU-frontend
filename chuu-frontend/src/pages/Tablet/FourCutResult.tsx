import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";

function FourCutResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const selectFrame = JSON.parse(sessionStorage.getItem("fourcutInfo")) || "";
  const { setFourCutImage } = useFourCutInfoStore();
  const images: string[] = location.state?.images || [];
  const finalFrame: string = selectFrame.finalFrame;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = 1080;
    const canvasHeight = 1920;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageWidth = 463;
    const imageHeight = 689;
    const gap = 24;

    const startX = 65;
    const startY = 78;

    const photoImages = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const frameImage = new Image();
    frameImage.src = finalFrame;

    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === 5) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.drawImage(photoImages[0], startX, startY, imageWidth, imageHeight);
        ctx.drawImage(
          photoImages[1],
          startX + imageWidth + gap,
          startY,
          imageWidth,
          imageHeight
        );
        ctx.drawImage(
          photoImages[2],
          startX,
          startY + imageHeight + gap,
          imageWidth,
          imageHeight
        );
        ctx.drawImage(
          photoImages[3],
          startX + imageWidth + gap,
          startY + imageHeight + gap,
          imageWidth,
          imageHeight
        );

        ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);

        const result = canvas.toDataURL("image/png");
        setFinalImage(result);
      }
    };

    [...photoImages, frameImage].forEach((img) => {
      img.onload = handleImageLoad;
    });
  }, [images, navigate]);

  const handleClick = async (method: string) => {
    if (method === "upload") {
      const blob = await (await fetch(finalImage)).blob(); // Base64 → Blob
      const file = new File([blob], "fourcut.png", { type: "image/png" });
      setFourCutImage(file);
      console.log(method);
      navigate("/upload-four-cut");
    } else {
      navigate("/four-cut");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        background: "rgba(37, 40, 45, 1)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {finalImage && (
        <>
          <img
            src={finalImage}
            alt="4컷 사진"
            style={{ width: "100%", maxWidth: "360px" }}
          />
          <div>
            <button onClick={() => handleClick("upload")}>업로드</button>
            <button onClick={() => handleClick("recapture")}>다시 찍기</button>
          </div>
        </>
      )}
    </div>
  );
}

export default FourCutResult;
