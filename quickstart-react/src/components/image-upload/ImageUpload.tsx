import React from "react";
import { useState } from "react";
import ImagesCarousel from "../cards/ImagesCarousel";
import { UploadContainer } from "./ImageUploadStyle";

const ImageUpload = ({ setItemImages }: any) => {
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
  const [imagesList, setImagesList] = useState<string[]>([]);

  const fileToDataURL = (file: Blob) => {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onload = function (event: any) {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: any) => {
    e.preventDefault();
    let files = e.target.files;

    setItemImages(files);
    setShowImagePreview(true);
    const filesArray = Array.prototype.slice.call(files);
    const arr = (await Promise.all(filesArray.map(fileToDataURL))) as string[];
    setImagesList(arr);
  };

  return (
    <UploadContainer>
      {!showImagePreview && (
        <form className="form-init">
          <img src={require("../../assets/upload.svg")} alt="upload" height="80" width="80" />
          <input style={{ display: "none" }} id="fusk" type="file" multiple onChange={handleImageChange} />
          <label className="upload-btn" htmlFor="fusk">
            <span>Upload images</span>
          </label>
        </form>
      )}

      {showImagePreview && <ImagesCarousel images={imagesList} />}
    </UploadContainer>
  );
};

export default ImageUpload;
