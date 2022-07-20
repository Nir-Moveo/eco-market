import React, { useState } from "react";
import { PersonalCardContainer } from "./CardStyle";
import CardInfo from "./CardInfo";
import ImagesCarousel from "./ImagesCarousel";
import { Buttons, Groups, ICard } from "../../types/types";
import WishlistIcon from "../wishlist/WishlistIcon";
import _ from "lodash";
import { getItemsByIds } from "../../services/monday.api";
import Button from "../buttons/Button";
import PersonalCardInfo from "./PersonalCardInfo";

const PersonalCard = ({ card, type }: { card: ICard; type: Groups }) => {
  const [newCard, setNewCard] = useState(card);

  //re-render card data if wishlist changed
  const getCardInfo = async (itemId: number) => {
    const cards = await getItemsByIds([itemId], type);
    setNewCard(cards[0]);
  };

  const renderActiveCardSettings = () => {
    return (
      <div className="settings">
        <Button clickHandler={() => {}} type={Buttons.Primary} title="Edit" />
        <Button clickHandler={() => {}} type={Buttons.Secondary} title="Given" />
        <Button clickHandler={() => {}} type={Buttons.Delete} title="Delete" />
      </div>
    );
  };
  const renderNonActiveCardSettings = () => {
    return (
      <div className="settings">
        <Button clickHandler={() => {}} type={Buttons.Primary} title="Activate item" />
        <Button clickHandler={() => {}} type={Buttons.Delete} title="Delete" />
      </div>
    );
  };

  return (
    <PersonalCardContainer>
      <div className="left-container">
        <ImagesCarousel className="personal" images={newCard.images} />
        <PersonalCardInfo {...newCard} />

        <WishlistIcon item={newCard} getCardInfo={(itemId) => getCardInfo(itemId)} />
      </div>
      <div className="right-container">
        {type === Groups.Active ? renderActiveCardSettings() : renderNonActiveCardSettings()}
      </div>
    </PersonalCardContainer>
  );
};

export default PersonalCard;
