import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Chat.module.css";
import { ReactComponent as Allow } from "../assets/allow.svg";

type ChatHeaderProps = { 
    teacherName?: string;
};

const ChatHeader = ({ teacherName }: ChatHeaderProps) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
       <div className={styles.header}>
        <div className={styles.headerLeft} onClick={goBack}>
            <Allow />
        </div>
        <div className={styles.headerTitle}>
            {teacherName || 'AI 채팅'}
        </div>
        <div className={styles.headerRight}></div>
       </div> 
    )  
};

export default ChatHeader;