import React, { useEffect } from "react";
import { useState } from "react";
import { deleteImageFromItem, getItemsByIds } from "../../services/monday.api";
import { Groups } from "../../types/types";
import ImagesCarousel from "../cards/ImagesCarousel";
import { EditContainer, ItemListContainer, UploadContainer } from "./ImageUploadStyle";

const ImageUpload = ({ setItemImages, item, updateCard }: any) => {
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
  const [imagesList, setImagesList] = useState<string[]>([]);

  const handleImageDelete = async (key: number) => {
    const tempImages = [...item.images];
    tempImages.splice(key, 1);
    await updateCard({ ...item, images: tempImages });
    await deleteImageFromItem(item.id, item.images[key]);
  };

  const containerImage = {
    position: "relative" as "relative",
    display: "flex",
  };

  const styleImg = {
    position: "absolute" as "absolute",
    right: 10,
    top: 15,
    cursor: "pointer",
  };

  const renderImages = (images: string[]) => {
    return images.map((item, key: number) =>
      item.length ? (
        <ItemListContainer>
          <img height="140" className="marketImg" key={item} src={`${item}`}></img>
          <img
            onClick={() => handleImageDelete(key)}
            style={styleImg}
            src={require("../../assets/trash.svg")}
            height="26"
            width="26"
            key={Math.random()}
          />
        </ItemListContainer>
      ) : (
        <></>
      )
    );
  };

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
    console.log(e);
    let files = e.target.files;

    setItemImages(files);
    setShowImagePreview(true);
    const filesArray = Array.prototype.slice.call(files);
    const arr = (await Promise.all(filesArray.map(fileToDataURL))) as string[];
    setImagesList([...imagesList, ...arr]);
  };
  if (!item) {
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
  } else {
    return (
      <EditContainer>
        {!showImagePreview && (
          <ItemListContainer>
            {renderImages(item.images)}
            <form className="form-init">
              {/* <img src={require("../../assets/upload.svg")} alt="upload" height="80" width="80" /> */}
              <input style={{ display: "none" }} id="fusk" type="file" multiple onChange={handleImageChange} />
              <label className="upload-btn" htmlFor="fusk">
                <img onChange={handleImageChange} src={require("../../assets/upload-img.svg")} alt="logo" />
                <span>Upload images</span>
              </label>
            </form>
          </ItemListContainer>
        )}
        {showImagePreview && (
          <ItemListContainer>
            {renderImages(item.images)}
            <ImagesCarousel images={imagesList} />
            <input style={{ display: "none" }} id="fusk" type="file" multiple onChange={handleImageChange} />
            <label className="upload-btn" htmlFor="fusk">
              <img onChange={handleImageChange} src={require("../../assets/upload-img.svg")} alt="logo" />
              <span>Upload images</span>
            </label>
          </ItemListContainer>
        )}
      </EditContainer>
    );
  }
};

export default ImageUpload;
