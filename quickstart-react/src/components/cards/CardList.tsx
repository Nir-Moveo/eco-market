import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useState } from "react";
import { Colors } from "../../colors";
import { ICardList } from "../../types/types";
import Card from "./Card";
import { CardListContainer } from "./CardStyle";
import Placeholder from "../placeholder/Placeholder";

const CardList = ({ cards }: { cards: ICardList }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (cards.length > 0) {
      setIsLoading(false);
    }
  }, [cards]);
  const renderCards = (cards: ICardList) => {
    return cards.map((card, key: number) => <Card key={card.id} {...card}></Card>);
  };
  const ListSkeleton = ({ listsToRender = 0 }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <Skeleton sx={{ bgcolor: Colors.GREY }} variant="rectangular" width={288} height={430} />
          ))}
      </>
    );
  };
  if (isLoading) {
    return (
      <CardListContainer>
        <ListSkeleton listsToRender={8} />
      </CardListContainer>
    );
  }
  if (!(cards.length > 0)) {
    return <Placeholder title="No items were found..." subTitle="Try looking for a different item"></Placeholder>;
  } else {
    return <CardListContainer>{renderCards(cards)}</CardListContainer>;
  }
};

export default CardList;
