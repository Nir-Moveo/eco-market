import React, { useEffect, useState } from "react";
import { PersonalCardContainer } from "./CardStyle";
import CardInfo from "./CardInfo";
import ImagesCarousel from "./ImagesCarousel";
import { Buttons, Groups, ICard, ICardList } from "../../types/types";
import WishlistIcon from "../wishlist/WishlistIcon";
import _ from "lodash";
import { getItemsByIds } from "../../services/monday.api";
import Button from "../buttons/Button";
import PersonalCardInfo from "./PersonalCardInfo";
import EditModal from "../modal/EditModal";
import Popup from "../popup/Popup";

interface IPersonalCard {
  card: ICard;
  type: Groups;
}
const PersonalCard = (props: IPersonalCard) => {
  const { card, type } = props;
  const [newCard, setNewCard] = useState(card);
  const [showEdit, setShowEdit] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  //re-render card data if wishlist changed
  const getCardInfo = async (itemId: number) => {
    const cards = await getItemsByIds([itemId], type);
    setNewCard(cards[0]);
  };

  const onEditClickHandler = () => {
    setShowEdit(true);
  };

  const onDeleteClickHandler = () => {
    setShowPopup(true);
    setPopupType("delete");
  };

  const onGivenClickHandler = () => {
    setShowPopup(true);
    setPopupType("given");
  };
  const onActivateClickHandler = () => {
    setShowPopup(true);
    setPopupType("activate");
  };
  const renderActiveCardSettings = () => {
    return (
      <div className="settings">
        <Button clickHandler={onEditClickHandler} type={Buttons.Primary} title="Edit" />
        <Button clickHandler={onGivenClickHandler} type={Buttons.Secondary} title="Given" />
        <Button clickHandler={onDeleteClickHandler} type={Buttons.Delete} title="Delete" />
      </div>
    );
  };
  const renderNonActiveCardSettings = () => {
    return (
      <div className="settings">
        <Button clickHandler={onActivateClickHandler} type={Buttons.Primary} title="Activate item" />
        <Button clickHandler={onDeleteClickHandler} type={Buttons.Delete} title="Delete" />
      </div>
    );
  };

  return (
    <>
      <PersonalCardContainer className={isDelete ? "delete" : ""}>
        <div className="left-container">
          <ImagesCarousel className="personal" images={newCard.images} />
          <PersonalCardInfo {...newCard} />

          <WishlistIcon item={newCard} getCardInfo={(itemId) => getCardInfo(itemId)} />
        </div>
        <div className="right-container">
          {type === Groups.Active ? renderActiveCardSettings() : renderNonActiveCardSettings()}
        </div>
        {showEdit && (
          <EditModal
            updateCard={(newCard: ICard) => setNewCard(newCard)}
            card={newCard}
            show={showEdit}
            setShowEdit={setShowEdit}
          />
        )}
      </PersonalCardContainer>
      <Popup status={popupType} item={card} show={showPopup} setShowPopup={setShowPopup} setIsDelete={setIsDelete} />
    </>
  );
};

export default PersonalCard;
