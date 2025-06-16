import { useState, useEffect } from "react";
import styles from "../../styles/Chat.module.css";
import { useNavigate } from "react-router-dom";
import ChatHeader from "../../components/ChatHeader";
import Footer from "../../components/Footer";
import axios from "axios";

interface ChatPreview {
  id: string;
  teacherName: string;
  gender: string;
  lastMessageTime: string;
  lastReply?: string;
  unread: boolean;
  profileImage: string;
}
type TimeDiff = {
  value: number;
  unit: "초" | "분" | "시간" | "일";
};

function ChatList() {
  const navigate = useNavigate();
  const [readChatIds, setReadChatIds] = useState<string[]>([]);
  const [chatListData, setChatListData] = useState<ChatPreview[]>([]);

  const calcTimeDiff = (messageTime: string): TimeDiff => {
    const now = new Date().getTime();
    const msgTime = new Date(messageTime).getTime();
    const diffInSeconds = Math.floor((now - msgTime) / 1000);

    if (diffInSeconds < 60) return { value: diffInSeconds, unit: "초" };
    else if (diffInSeconds < 3600)
      return { value: Math.floor(diffInSeconds / 60), unit: "분" };
    else if (diffInSeconds < 86400)
      return { value: Math.floor(diffInSeconds / 3600), unit: "시간" };
    else return { value: Math.floor(diffInSeconds / 86400), unit: "일" };
  };

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/web-main"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  // 포맷 함수
  const formatTimeDiff = ({ value, unit }: TimeDiff): string => {
    return `${value}${unit} 전`;
  };

  const handleClick = async (teacherId: string) => {
    try {
      const response = await axios.post(
        "https://chuu.mirim-it-show.site/chatbot/createRoom",
        {
          teacherId,
        }
      );

      const { roomId } = response.data;

      // 읽음 처리
      const updatedReadChatIds = [...readChatIds, teacherId];
      setReadChatIds(updatedReadChatIds);
      localStorage.setItem("readChatIds", JSON.stringify(updatedReadChatIds));

      navigate(`/chatbot/${teacherId}?roomId=${roomId}`);
    } catch (error) {
      console.error("채팅방 생성 실패 : ", error);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("readChatIds");
    if (stored) {
      setReadChatIds(JSON.parse(stored));
    }

    const fetchData = async () => {
      try {
        // 선생님 목록 가져오기
        const teacherRes = await axios.get(
          "https://chuu.mirim-it-show.site/teachers"
        );
        console.log("선생님 데이터:", teacherRes.data);
        const teachers = teacherRes.data;

        // 각 선생님에 대한 메시지 가져오기
        const chatData: ChatPreview[] = await Promise.all(
          teachers.map(async (teacher: any) => {
            try {
              const msgRes = await axios.get(
                `https://chuu.mirim-it-show.site/chatbot?teacherId=${teacher.teacherId}`
              );
              const messages = msgRes.data;

              // 마지막 assistant 메시지 찾기
              const lastAssistantMsg = [...messages]
                .reverse()
                .find((msg: any) => msg.role === "assistant");

              // 마지막 메시지 시간
              const lastMessage = messages[messages.length - 1];
              const messageTime = lastMessage?.createdAt;

              // 읽음 여부
              // const isRead = readChatIds.includes(teacher.teacherId);
              // const unread = !isRead && messages.some((msg: any) => msg.role === "assistant" && msg.read === false);

              return {
                id: teacher.teacherId,
                teacherName: teacher.name,
                gender: teacher.gender,
                lastMessageTime: messageTime,
                lastReply: lastAssistantMsg?.message || "",
                unread: false,
                profileImage: teacher.imagePath,
              };
            } catch (err) {
              console.error("메시지 가져오기 실패", err);
              return {
                id: teacher.teacherId,
                teacherName: teacher.name,
                gender: teacher.gender,
                lastMessageTime: 0,
                lastReply: "",
                unread: false,
                profileImage: teacher.imagePath,
              };
            }
          })
        );

        setChatListData(chatData);
      } catch (err) {
        console.error("선생님 목록 가져오기 실패", err);
      }
    };

    fetchData();
  }, []);

  function truncateText(text: string, maxLength: number = 70) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }

  return (
    <div className={styles.chatListContainer}>
      <ChatHeader />

      {chatListData.map((chat) => {
        const isRead = readChatIds.includes(chat.id);

        return (
          <div
            key={chat.id}
            className={`${styles.chatItem} ${isRead ? styles.read : ""}`}
            onClick={() => handleClick(chat.id)}
          >
            <img
              src={`/teachers/${chat.id}.png`}
              alt="선생님 프로필"
              className={styles.profileImage}
            />
            <div className={styles.chatContent}>
              <div className={styles.chatHeader}>
                <span className={styles.teacherName}>{chat.teacherName}</span>
                <span className={styles.time}>
                  {typeof chat.lastMessageTime === "string"
                    ? formatTimeDiff(calcTimeDiff(chat.lastMessageTime))
                    : chat.lastMessageTime}
                </span>
              </div>
              <div className={styles.lastMessage}>
                {truncateText(chat.lastReply) || "채팅 내역이 없습니다."}
              </div>
            </div>
            {/* {!isRead && <div className={styles.unreadDot} />} */}
          </div>
        );
      })}

      <div className={styles.bottomNav}>
        <Footer />
      </div>
    </div>
  );
}

export default ChatList;
