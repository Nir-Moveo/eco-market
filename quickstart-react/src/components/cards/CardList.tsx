import React, { useEffect } from "react";
import { ICardList } from "../../types/types";
import Card from "./Card";
import { CardListContainer } from "./CardStyle";

const CardList = ({ cards }: { cards: ICardList}) => {
  useEffect(() => {}, [cards]);

  const renderCards = (cards: ICardList) => {
    return cards.map((card, key: number) => <Card key={card.id} {...card}></Card>);
  };

  return <CardListContainer>{renderCards(cards)}</CardListContainer>;
};

export default CardList;
