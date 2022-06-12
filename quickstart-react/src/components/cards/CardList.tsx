import React from "react";
import { ICardList } from "../../types/types";
import Card from "./Card";
import { CardListContainer } from "./CardStyle";

const CardList = ({ cards }: { cards: ICardList }) => {
  const renderCards = () => {
    return cards.map((card, key: number) => <Card key={key} {...card}></Card>);
  };
  return <CardListContainer>{renderCards()}</CardListContainer>;
};

export default CardList;
