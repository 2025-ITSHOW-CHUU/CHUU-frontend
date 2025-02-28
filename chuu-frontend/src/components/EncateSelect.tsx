import React, { useEffect, useState } from "react";
import encate from "../assets/encate.json";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import style from "../styles/EncateSelect.module.css";

type QuestionType = {
  question: string;
  teacher: string[];
};

function EncateSelect() {
  const [encateQuestion, setEncateQuestion] = useState<QuestionType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEncateQuestion(encate.encate);
  }, []);

  const onClick = (dir: string) => {
    navigate(dir);
  };

  return (
    <div className="EncateSelectDiv">
      {(Object.entries(encateQuestion) as [string, QuestionType][]).map(
        ([questionNumber, result]) => (
          <button
            key={questionNumber}
            id={questionNumber}
            onClick={() => onClick(`/encate/${questionNumber}`)}
            className={`${style["EnCateButton"]}`}
          >
            <p>{result.question}</p>
            <IoIosArrowForward />
          </button>
        )
      )}
    </div>
  );
}

export default EncateSelect;
