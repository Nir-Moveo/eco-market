import React, { useEffect } from "react";
import { ICardList } from "../../types/types";
import Card from "./Card";
import { CardListContainer } from "./CardStyle";

const CardList = ({ cards, userId }: { cards: ICardList, userId: number }) => {
  useEffect(() => {}, [cards]);

  const renderCards = (cards: ICardList) => {
    return cards.map((card, key: number) => <Card key={card.id} userId={userId} card={card}></Card>);
  };

  return <CardListContainer>{renderCards(cards)}</CardListContainer>;
};

export default CardList;
