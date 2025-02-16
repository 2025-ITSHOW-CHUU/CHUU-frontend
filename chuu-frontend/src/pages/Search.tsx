import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import def from "../styles/Default.module.css";
import style from "../styles/Search.module.css";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { IoIosArrowBack } from "react-icons/io";
import teacherData from "../assets/teachers.json";

type TeacherType = {
  name: string;
  photo: string;
  personality: string;
  hashtags: string[];
};

function Search({}) {
  const [search, setSearch] = useState<string>("");
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [originalTeachers, setOriginalTeachers] = useState<TeacherType[]>([]);

  useEffect(() => {
    setTeachers(teacherData.teachers);
    setOriginalTeachers(teacherData.teachers);
  }, []);

  const onChange = (value: string) => {
    setSearch(value);
    searchResult(value);
  };

  const searchResult = (value: string) => {
    if (value === "") {
      setTeachers(originalTeachers);
      return;
    }

    const searchedResult = originalTeachers.filter(
      (teacher: TeacherType) =>
        teacher.name.includes(value) ||
        teacher.hashtags.some((hashtag) => hashtag.includes(value))
    );

    setTeachers(searchedResult);
  };

  return (
    <div className={`${def["Body"]}`}>
      <div className={`${def["Logo"]}`}>
        <Logo />
      </div>
      <div className={`${style["SearchDiv"]}`}>
        <IoIosArrowBack size="25px" />
        <SearchBar value={search} onChange={onChange} />
      </div>
      <div className={`${style["SearchResult"]}`}>
        {(teachers as TeacherType[]).map((teacher) => (
          <div>
            <div>
              <img src={teacher.photo} />
            </div>
            <div>
              <p>{teacher.name}</p>
              <p>{teacher.personality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
