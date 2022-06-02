import React from "react";
import { CardContainer } from "./CardStyle";
import CardInfo from "./CardInfo";
import ImagesCarousel from "./ImagesCarousel";

export interface ICard {
  name: string;
  description: string;
  owner: string;
  images?: string[];
  interested_list: string[];
  phone_number: string;
  published_at: string;
}

const Card: React.FC<ICard> = (props: ICard) => {
  return (
    <CardContainer>
      <ImagesCarousel images={props.images} />
      <CardInfo {...props} />
    </CardContainer>
  );
};

export default Card;
