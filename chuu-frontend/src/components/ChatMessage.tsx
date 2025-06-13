import React from 'react';
import styles from '../styles/ChatMessage.module.css';

interface ChatMessageProps {
  profileImg?: string;
  time: string;
  message: string;
  isRead: boolean;
}

// const ChatMessage: React.FC<ChatMessageProps> = ({ 
//   profileImg, 
//   time, 
//   message, 
//   isRead: initialIsRead,
// }) => {
//   const [isRead, setIsRead] = useState(initialIsRead);
  
//   const handleClick = () => {
//     if (isRead) setIsRead(false); // 클릭 시 읽음 처리
//   };

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  profileImg,
  message
}) => {  

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageContent}>
        <div className={styles.profileSection}>
          <img src={profileImg} alt="Profile" className={styles.profileImg} />
        </div>
        <div className={styles.textSection}>
          <div className={styles.messageHeader}></div>
          <p className={styles.messageText}>{message}</p>
        </div>
      </div>
      <div className={styles.readIndicator}></div>
    </div>
  );
};

export default ChatMessage;