import React from "react";
import { SlideShow, Slide } from "./CardStyle";
import { useState } from "react";

const ImagesCarousel = ({ images }: { images: string[] | undefined }): JSX.Element => {
  const [slideIndex, setSlideIndex] = useState(0);

  function renderImages() {
    if (images && images.length > 0) {
      return images.map((imageSrc, index) => (
        <Slide className={index !== slideIndex ? "fade hide" : "fade"} key={index}>
          <img src={imageSrc || require("../../assets/imagePlaceholder.jpeg")}></img>
        </Slide>
      ));
    } else return <img className="image-placeholder" src={require("../../assets/imagePlaceholder.jpeg")}></img>;
  }

  // Next/previous controls
  function plusSlides(n: number) {
    if (images) {
      let nextIndex = (slideIndex + n) % images.length;
      if (nextIndex < 0) nextIndex += images.length;
      setSlideIndex(nextIndex);
    }
  }
  function isMultipleSlides() {
    return images && images.length > 1;
  }

  return (
    <SlideShow>
      {renderImages()}
      {isMultipleSlides() && (
        <div className="arrows-container">
          <img className="prev" src={require("../../assets/prev-icon.svg")} onClick={() => plusSlides(-1)}></img>

          <img className="next" src={require("../../assets/next-icon.svg")} onClick={() => plusSlides(1)}></img>
        </div>
      )}
    </SlideShow>
  );
};

export default ImagesCarousel;
