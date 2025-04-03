import React from "react";
import useImageStore from "../store/useImageStore.ts";

function UploadImage() {
  const { file } = useImageStore();

  return (
    <div>
      {file ? (
        <img src={URL.createObjectURL(file)} alt="Uploaded" />
      ) : (
        <p>No file uploaded</p>
      )}
    </div>
  );
}

export default UploadImage;
