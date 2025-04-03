import React from "react";
import useImageStore from "../store/useImageStore.ts";
import PageBar from "../components/PageBar.tsx";
import def from "../styles/Default.module.css";

function UploadImage() {
  const { file } = useImageStore();

  return (
    <div className={def.Body}>
      <PageBar pageName="추구미 게시물 올리기" />
      {file ? (
        <img src={URL.createObjectURL(file)} alt="Uploaded" />
      ) : (
        <p>No file uploaded</p>
      )}
    </div>
  );
}

export default UploadImage;
