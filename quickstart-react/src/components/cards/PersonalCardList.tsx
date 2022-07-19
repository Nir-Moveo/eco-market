import React from "react";
import { PersonalCardListContainer } from "./CardStyle";
import { Groups, ICardList } from "../../types/types";
import PersonalCard from "./PersonalCard";

const PersonalCardList = ({ cards, type }: { cards: ICardList; type: Groups }) => {
  const renderCards = (cards: ICardList) => {
    return cards.map((card, key: number) => <PersonalCard type={type} key={card.id} card={card}></PersonalCard>);
  };

  return <PersonalCardListContainer>{renderCards(cards)}</PersonalCardListContainer>;
};

export default PersonalCardList;
