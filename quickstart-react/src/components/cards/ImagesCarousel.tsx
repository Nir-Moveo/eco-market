import React from "react";
import { images } from "../../constans";
import { SlideShow, Slide } from "./CardStyle";
import { useState } from "react";

const ImagesCarousel = (props: { images: string[] | undefined }): JSX.Element => {
  const [slideIndex, setSlideIndex] = useState(0);

  function renderImages() {
    if (images)
      return images.map((imageSrc, ind) => (
        <Slide className={ind !== slideIndex ? "fade hide" : "fade"}>
          <img src={imageSrc}></img>
        </Slide>
      ));
  }

  // Next/previous controls
  function plusSlides(n: number) {
    if (images) {
      let nextIndex = (slideIndex + n) % images.length;
      if (nextIndex < 0) nextIndex += images.length;
      setSlideIndex(nextIndex);
    }
  }

  return (
    <SlideShow>
      {renderImages()}
      <a className="prev" onClick={() => plusSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>
    </SlideShow>
  );
};

export default ImagesCarousel;
