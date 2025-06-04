import React, { useEffect, useState } from "react";
import encate from "../../assets/encate.json";
import style from "../../styles/Encate.module.css"; // Ensure this file exists and contains the required styles
import def from "../../styles/Default.module.css"; // Ensure this file exists and contains the required styles
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../store/slices/encateSlice";
import { useDispatch } from "react-redux";

type QuestionType = {
  question: string;
  teacher: string[];
  image: string;
};

interface EncateType {
  questionNumber: number;
  answer: string;
}

function Encate() {
  const [encateQuestion, setEncateQuestion] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredTeacher, setAnsweredTeacher] = useState(0);
  const [answeredList, setAnsweredList] = useState<EncateType[]>([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setEncateQuestion(encate.encate);

    const encateButtons = document.getElementsByClassName("option");
    for (let i = 0; i < encateButtons.length; i++) {
      if (i === answeredTeacher) {
        encateButtons[i].classList.add(style.selected);
      } else {
        encateButtons[i].classList.remove(style.selected);
      }
    }
  }, [answeredTeacher]);

  const handleAnswer = async (teacher: string) => {
    const isLast = currentQuestionIndex === encateQuestion.length - 1;

    const slice: EncateType = {
      questionNumber: currentQuestionIndex,
      answer: encateQuestion[currentQuestionIndex].teacher[answeredTeacher],
    };
    const newAnsweredList = [...answeredList, slice];
    setAnsweredList(newAnsweredList);

    try {
      await axios.post("http://localhost:3000/home", {
        questionNumber: currentQuestionIndex,
        teacherName: teacher,
      });
    } catch (error) {
      console.log("앙케이드 투표 오류:", error);
    }

    if (isLast) {
      console.log(newAnsweredList);
      dispatch(addItem(newAnsweredList));
      navigate("/encate-result");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnsweredTeacher(null);
    }
  };

  const formattedQuestion = encateQuestion[currentQuestionIndex]?.question
    .split("\n")
    .map((part: string, index: number) => (
      <span key={index}>
        {part}
        {index <
          encateQuestion[currentQuestionIndex].question.split("\n").length -
            1 && <br />}
      </span>
    ));

  const backButton = () => {
    navigate(-1);
  };

  return (
    <div className={`${def["Body"]} ${style["EncateContainer"]}`}>
      <div className={`${style["BackContainer"]}`} onClick={backButton}>
        <IoIosArrowBack size="30px" />
      </div>
      <div className={`${style["TitleDiv"]}`}>
        <p>{`${currentQuestionIndex + 1}`}.</p>
        <p>{formattedQuestion}</p>
      </div>
      <img
        src={encateQuestion[currentQuestionIndex]?.image}
        alt={encateQuestion[currentQuestionIndex]?.image}
        width={242.68}
        height={242.68}
      />
      <div className={`${style["EncateDiv"]}`}>
        {encateQuestion[currentQuestionIndex]?.teacher.map(
          (teacher: string, i: number) => (
            <button
              key={i}
              className="option"
              onClick={() => {
                setAnsweredTeacher(i);
              }}
            >
              {teacher} 선생님
            </button>
          )
        )}
      </div>
      <button
        className={style.nextButton}
        onClick={() =>
          handleAnswer(
            encateQuestion[currentQuestionIndex]?.teacher[answeredTeacher]
          )
        }
      >
        다음
      </button>
    </div>
  );
}

export default Encate;
