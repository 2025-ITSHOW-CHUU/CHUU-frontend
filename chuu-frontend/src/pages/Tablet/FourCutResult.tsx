import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FourCutResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const images: string[] = location.state?.images || [];

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
    frameImage.src = "/images/fourcut/frame_final.png";

    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === 5) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.drawImage(photoImages[0], startX, startY, imageWidth, imageHeight);                           
        ctx.drawImage(photoImages[1], startX + imageWidth + gap, startY, imageWidth, imageHeight);           
        ctx.drawImage(photoImages[2], startX, startY + imageHeight + gap, imageWidth, imageHeight);          
        ctx.drawImage(photoImages[3], startX + imageWidth + gap, startY + imageHeight + gap, imageWidth, imageHeight);

        ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);

        const result = canvas.toDataURL("image/png");
        setFinalImage(result);
      }
    };

    [...photoImages, frameImage].forEach((img) => {
      img.onload = handleImageLoad;
    });

  }, [images, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px", background: "rgba(37, 40, 45, 1)" }}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {finalImage && (
        <>
          <img
            src={finalImage}
            alt="4컷 사진"
            style={{ width: "100%", maxWidth: "360px" }}
          />
        </>
      )}
    </div>
  );
}

export default FourCutResult;
