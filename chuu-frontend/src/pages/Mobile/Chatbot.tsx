import React, { useState, useRef, useEffect, FormEvent } from "react";
import style from "../../styles/Chat.module.css";
import ChatHeader from "../../components/ChatHeader";
import ChatBubble from "../../components/ChatBubble";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

import { ReactComponent as TextSymbol } from "../../assets/text_symbol.svg";

type Message = {
  role: "user" | "assistant";
  content: string;
  avatar?: string;
  imagePath?: string;
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const roomId = location.search.split("?")[1];
  const { teacherId } = useParams();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(roomId, teacherId);

  const [teacherInfo, setTeacherInfo] = useState<{
    name: string;
    personality: string;
    prompt: string;
    imagePath: string;
    specialties: string[];
  }>();

  // 이미지 URL 생성 함수 추가
  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `https://chuu.mirim-it-show.site/${imagePath}`;
  };

  useEffect(() => {
    if (teacherId && roomId) {
      axios
        .get(`https://chuu.mirim-it-show.site/chatbot?teacherId=${teacherId}`)
        .then((res) => setTeacherInfo(res.data))
        .catch((err) => console.error("선생님 정보 불러오기 실패", err));
    }
  }, [teacherId, roomId]);

  useEffect(() => {
    if (teacherId && roomId && teacherInfo) {
      loadChatHistory();
    }
  }, [teacherId, roomId, teacherInfo]);

  const loadChatHistory = async () => {
    try {
      const response = await axios.get(
        `https://chuu.mirim-it-show.site/chatbot`,
        {
          params: { teacherId },
          // roomId 제외
        }
      );

      console.log("📦 axios 응답 전체:", response.data);

      if (Array.isArray(response.data)) {
        console.log("response data: ", response.data);

        response.data.forEach((item, index) => {
          console.log(
            `🖼️ Item ${index} - role: ${item.role}, imagePath: ${item.imagePath}`
          );
        });

        const formattedMessages: Message[] = response.data.map((item: any) => ({
          role: item.role,
          content: item.message,
          createdAt: item.createdAt,
          avatar:
            item.role === "assistant" && item.imagePath
              ? getImageUrl(item.imagePath)
              : undefined,
          teacherId: item.teacherId,
        }));

        console.log("🎭 Formatted messages:", formattedMessages);
        setMessages(formattedMessages);
      } else {
        console.error("응답 데이터가 배열이 아닙니다:", response.data);
      }
    } catch (error) {
      console.error("채팅 내역 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages, isTyping]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || !roomId || !teacherId) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true); // 메시지 전송 전 로딩 시작
    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      const res = await axios.post("https://chuu.mirim-it-show.site/chatbot", {
        roomId,
        teacherId,
        message: trimmed,
      });

      const assistantContent = res.data.assistant.response;

      console.log("🔍 teacherInfo:", teacherInfo);
      console.log("🔍 imagePath:", teacherInfo.imagePath);

      if (!assistantContent) {
        console.error("응답이 없습니다.");
        return;
      }

      // 타이핑 효과 시작
      setIsTyping(true);
      setTypingContent("");

      let index = 0;
      const typingInterval = setInterval(() => {
        setTypingContent((prev) => prev + assistantContent[index]);
        index++;

        if (index >= assistantContent.length) {
          clearInterval(typingInterval);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: assistantContent,
              avatar: teacherInfo?.imagePath
                ? getImageUrl(teacherInfo.imagePath)
                : undefined,
            },
          ]);
          setIsTyping(false);
          setTypingContent("");
        }
      }, 30);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      // 에러 메시지 표시
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "죄송합니다. 응답을 가져오는데 실패했습니다.",
          avatar: teacherInfo?.imagePath,
        },
      ]);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
      inputRef.current?.focus();
    }
  };

  // roomId가 없으면 에러 표시
  if (!roomId) {
    return (
      <div className={style["chatbotContainer"]}>
        <div className={style["errorMessage"]}>
          채팅방 정보가 없습니다. 다시 시도해주세요.
        </div>
      </div>
    );
  }

  return (
    <>
      {teacherInfo ? (
        <ChatHeader teacherName={teacherInfo.name} />
      ) : (
        <ChatHeader />
      )}

      <div className={style["chatbotContainer"]}>
        <div className={style["chatbotMessages"]}>
          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              content={msg.content}
              role={msg.role}
              avatar={msg.avatar}
            />
          ))}

          {isLoading && (
            <ChatBubble
              key="dots"
              content={
                <span className={style["chatbotTyping"]}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              }
              role="assistant"
              avatar={
                teacherInfo?.imagePath
                  ? getImageUrl(teacherInfo.imagePath)
                  : undefined
              }
            />
          )}

          {isTyping && (
            <ChatBubble
              key="typing"
              content={typingContent}
              role="assistant"
              avatar={
                teacherInfo?.imagePath
                  ? getImageUrl(teacherInfo.imagePath)
                  : undefined
              }
            />
          )}

          <div ref={messageEndRef} />
        </div>
        <form className={style["chatbotForm"]} onSubmit={handleSubmit}>
          <div className={style["chatbotWrapper"]}>
            <input
              ref={inputRef}
              className={style["chatbotInput"]}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // placeholder="메시지를 입력하세요."
              disabled={isLoading}
            />
            {/* disabled={isLoading || !input.trim()} */}
            <TextSymbol
              type="submit"
              style={{ color: isLoading ? "#ffffff" : "#65e9ff" }}
            />
            {/* <button className={style["chatbotButton"]}></button> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
