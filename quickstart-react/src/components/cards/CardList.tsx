import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useState } from "react";
import { Colors } from "../../colors";
import { ICardList } from "../../types/types";
import Card from "./Card";
import { CardListContainer } from "./CardStyle";
import Placeholder from "../placeholder/Placeholder";
export interface CardListProps {
  isLoading: boolean;
  cards: ICardList
}

const CardList = ( props: CardListProps ) => {
  const {isLoading, cards} = props;

  const renderCards = (cards: ICardList) => {
    return cards.map((card, key: number) => (
      <Card key={card.id} {...card}></Card>
    ));
  };
  const ListSkeleton = ({ listsToRender = 0 }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <Skeleton
              key={index}
              sx={{ bgcolor: Colors.GREY }}
              variant="rectangular"
              width={288}
              height={430}
            />
          ))}
      </>
    );
  };
  return (
    <div>
      {isLoading && (
        <CardListContainer>
          <ListSkeleton listsToRender={8} />
        </CardListContainer>
      )}
      {!(cards.length > 0) && !isLoading && (
        <Placeholder
          title="No items were found..."
          subTitle="Try looking for a different item"
        ></Placeholder>
      )}
      {cards.length > 0 && !isLoading && (
        <CardListContainer>{renderCards(cards)}</CardListContainer>
      )}
    </div>
  );
};

export default CardList;
