import React, { useState } from "react";
import { CardContainer } from "./CardStyle";
import CardInfo from "./CardInfo";
import ImagesCarousel from "./ImagesCarousel";
import { Groups, ICard } from "../../types/types";
import WishlistIcon from "../wishlist/WishlistIcon";
import _ from "lodash";
import { getItemsByIds } from "../../services/monday.api";

const Card: React.FC<ICard> = (props: ICard) => {
  const [newProps, setNewProps] = useState(props);

  //re-render card data if wishlist changed
  const getCardInfo = async (itemId: number) => {
    const cards = await getItemsByIds([itemId], Groups.Active);
    setNewProps(cards[0]);
  };

  return (
    <CardContainer>
      <ImagesCarousel images={newProps.images} />
      <CardInfo {...newProps} />
      <WishlistIcon item={newProps} getCardInfo={(itemId) => getCardInfo(itemId)} />
    </CardContainer>
  );
};

export default Card;
