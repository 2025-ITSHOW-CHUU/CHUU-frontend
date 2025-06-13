import React, { useEffect, useState, useRef } from "react";
import style from "../styles/ChatBubble.module.css";
import { useParams } from "react-router-dom";

interface ChatBubbleProps {
  content: string | React.ReactNode;
  role: "user" | "assistant";
  avatar?: string;
  teacherId?: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content, role }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const { teacherId } = useParams<{ teacherId: string}>();
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const checkLineCount = () => {
      if (bubbleRef.current) {
        const computed = getComputedStyle(bubbleRef.current);
        const lineHeight = parseFloat(computed.lineHeight);
        const height = bubbleRef.current.clientHeight;
        const lineCount = Math.round(height / lineHeight);
        setIsMultiLine(lineCount > 1);
      }
    };

    checkLineCount();
    window.addEventListener("resize", checkLineCount);
    return () => window.removeEventListener("resize", checkLineCount);
  }, [content]);

  useEffect(() => {
    if (content !== "...") return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div className={`${style["chatMessage"]} ${style[role]}`}>
      {role === "assistant" && teacherId && (
          <img
            className={style["avatar"]}
            src={`/teachers/${teacherId}.png`}
            alt="avatar"
          />
      )}
      <div
        ref={bubbleRef}
        className={style["bubble"]}
        style={{
          borderRadius: isMultiLine ? "20px" : "50px",
        }}
      >
        {typeof content === "string" ? (
          content === "..."
            ? <div className={style["thinkingDots"]}></div>
            : content.split("\n").map((line, i) => (
                <div key={`${i}-${line}`}>{line}</div>
              ))
        ) : (
          content
        )}

      </div>
    </div>
  );
};

export default ChatBubble;