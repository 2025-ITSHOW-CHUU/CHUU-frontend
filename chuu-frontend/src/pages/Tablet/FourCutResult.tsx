import React, { useEffect, useRef, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";
import style from "../../styles/FourcutResult.module.css";
import axios from "axios";
import ModalPortal from "../../components/ModalPortal";

function FourCutResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const { getFourCutInfo, setFourCutImage } = useFourCutInfoStore();
  const images: string[] = location.state?.images || [];
  const finalFrame = getFourCutInfo()?.finalFrame || "";
  const [inputedEmail, setInputedEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const isWideScreen = window.innerWidth >= 1024;

    if (!isWideScreen) {
      navigate("/"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

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
    if (!finalImage) return;

    const file = base64ToFile(finalImage, "fourcut.png");

    const formData = new FormData();
    formData.append("email", inputedEmail);
    formData.append("image", file);

    await axios.post("https://chuu.mirim-it-show.site/upload/email", formData);
  };

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

      navigate("/upload-four-cut");
    } else {
      navigate("/four-cut");
    }
  };

  const printFile = async (base64Url: string) => {
    try {
      const base64Data = base64Url.split(",")[1];

      const response = await fetch("https://chuu.mirim-it-show.site/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64Data }),
      });

      const html = await response.text();

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
      } else {
        alert("팝업 차단을 해제해주세요!");
      }
    } catch (err) {
      console.error("프린트 에러 발생:", err);
    }
  };

  return (
    <div className={style.FourcutContainer}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {finalImage && (
        <div className={style.ResultContainer}>
          <img src={finalImage} alt="4컷 사진" className={style.FourCutImage} />
          <div className={style.ButtonContainer}>
            <button
              onClick={() => handleClick("upload")}
              className={style.submitButton}
            >
              업로드
            </button>
            <button
              onClick={() => printFile(finalImage)}
              className={style.submitButton}
            >
              프린트하기
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className={style.submitButton}
            >
              이메일 보내기
            </button>
            <button
              onClick={() => navigate("/web-main")}
              className={style.submitButton}
            >
              돌아가기
            </button>
          </div>
        </div>
      )}

      {openModal && (
        <div
          className={style["modal-overlay"]}
          onClick={(e) => setOpenModal(false)}
        >
          <div
            className={style["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>츄 네컷사진 보내기</h2>
            <input
              type="email"
              value={inputedEmail}
              onChange={(e) => {
                setInputedEmail(e.target.value);
                setOpenModal(false);
              }}
              className={style.modalInput}
            />
            <button onClick={() => sendImage()} className={style.modalButton}>
              전송하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FourCutResult;
