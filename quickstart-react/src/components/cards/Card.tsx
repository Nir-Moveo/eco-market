import React, { useEffect, useState } from "react";
import { CardContainer } from "./CardStyle";
import CardInfo from "./CardInfo";
import ImagesCarousel from "./ImagesCarousel";
import { Columns, Groups, ICard, IUser } from "../../types/types";
import WishlistIcon from "../wishlist/WishlistIcon";
import _ from "lodash";
import { getItemsByIds } from "../../services/monday.api";

interface CardProps {
  userId: number;
  card: ICard;
}

const Card: React.FC<CardProps> = ({userId, card}: CardProps) => {
  const [newProps, setNewProps] = useState<ICard>(card);

  //re-render card data if wishlist changed
  const getCardInfo = async (itemId: number) => {
    const cards = await getItemsByIds([itemId], Groups.Active);
    setNewProps(cards[0]);
  };

  return (
    <CardContainer>
      <ImagesCarousel images={newProps.images} />
      <CardInfo {...newProps} />
      <WishlistIcon item={newProps} userId={userId} getCardInfo={(itemId) => getCardInfo(itemId)} />
    </CardContainer>
  );
};

export default Card;
