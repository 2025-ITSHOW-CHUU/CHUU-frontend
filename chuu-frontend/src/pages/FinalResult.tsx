import { useSelector } from "react-redux";
import { RootState } from "../store";
import React, { useEffect } from "react";
import axios from "axios";

function FinalResult() {
  const items = useSelector((state: RootState) => state.encate.list);
  console.log(items);

  useEffect(() => {
    async function fetchData() {
      try {
        const total_result = await axios.get("http://localhost:3000/home");
        console.log(total_result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <ul>
      {items.map((item: { answer: string }, index: number) => (
        <li key={index}>{item.answer}</li>
      ))}
    </ul>
  );
}

export default FinalResult;
