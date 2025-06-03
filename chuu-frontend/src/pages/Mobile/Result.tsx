import React from "react";
import def from "../../styles/Default.module.css";
import style from "../../styles/Result.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { useState, useEffect } from "react";
import TypeCard from "../../components/TypeCard";
import teachers from "../../assets/teachers.json";
import useTestScoreStore from "../../store/useTestScoreStore";

type ResultType = {
  name: string;
  photo: string;
  comment: string;
  personality: string;
  hashtags: string[];
};

type SimilarTypeData = {
  name: string;
  photo: string;
  comment: string;
};

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<ResultType | null>(null);
  const [similarTypeData, setSimilarTypeData] = useState<SimilarTypeData[]>([]);
  const selectedType = location.state?.type;

  useEffect(() => {

    const idx = teachers.teachers.findIndex(
      (t) => t.name == selectedType
    );

    setData(teachers.teachers[idx]);

    let similar = []

    console.log(`idx : ${idx}`);
    if (idx === 0) {
      similar = teachers.teachers.slice(1, 3);
    }
    else if (idx === teachers.teachers.length - 1) {
      similar = teachers.teachers.slice(teachers.teachers.length - 3, teachers.teachers.length - 1);
    }
    else {
      similar = [
        teachers.teachers[idx - 1],
        teachers.teachers[idx + 1],
      ];
    }

    setSimilarTypeData(similar);
  }, []);

  const returnBack = () => {
    navigate("/");
    setSimilarTypeData([]);
  };

  const onClick = (src: string) => {
    navigate(src);
  };

  return (
    <div className={def.Body}>
      <div className={style.header}>
        <div onClick={returnBack}>
          <IoIosArrowBack size="25px" />
        </div>
        <div className={style.title}>오늘의 나의 추구미</div>
      </div>
      <div className={style.Main}>
        <div>
          <p className={style.comment}>{data?.comment}</p>
        </div>
        <img src={data?.photo} alt={`${data?.name} 선생님 사진`}></img>
        <div className={style.name}>{data?.name}</div>
      </div>
      <ul className={style.tags}>
        {data?.hashtags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>
      <div className={style.description}>
        <p>"{data?.comment}"어원</p>
        <div>{data?.personality}</div>
      </div>
      <div className={style.similarType}>
        <p>같은 추구미 학생</p>
        <div>
          {similarTypeData?.map((item: SimilarTypeData, i: number) => (
            <TypeCard
              key={i}
              name={item.name}
              photo={item.photo}
              comment={item.comment}
            />
          ))}
        </div>
      </div>
      <button className={style.cameraBtn} onClick={() => onClick("/photo")}>
        <Camera />
        <p>선생님과 사진 찍기</p>
      </button>
    </div>
  );
}

export default Result;
