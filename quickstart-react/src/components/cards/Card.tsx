import React from "react";
import { CardContainer } from "./CardStyle";
import CardInfo from "./CardInfo";
import ImagesCarousel from "./ImagesCarousel";
import { ICard } from "../../types/types";


const Card: React.FC<ICard> = (props: ICard) => {
  return (
    <CardContainer>
      <ImagesCarousel images={props.images} />
      <CardInfo {...props} />
    </CardContainer>
  );
};

export default Card;
