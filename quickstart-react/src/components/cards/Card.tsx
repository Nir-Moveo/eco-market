import React from "react";
import { CardContainer } from "./CardStyle";
import CardInfo from "./CardInfo";

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
  const { name, description, owner, images, interested_list, phone_number, published_at } = props;

  return (
    <CardContainer>
      <CardInfo {...props} />
    </CardContainer>
  );
};

export default Card;
