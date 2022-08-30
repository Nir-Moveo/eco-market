import React from "react";
import { PersonalCardListContainer } from "./CardStyle";
import { Groups, ICardList } from "../../types/types";
import PersonalCard from "./PersonalCard";
import Skeleton from "@mui/material/Skeleton";
import { Colors } from "../../colors";

interface IPersonalCardList {
  isLoading: boolean;
  cards: ICardList;
  type: Groups;
}
const PersonalCardList = (props: IPersonalCardList) => {
  const { type, cards, isLoading } = props;

  const renderCards = (cards: ICardList) => {
    return cards.map((card, key: number) => (
      <PersonalCard type={type} key={card.id} card={card}></PersonalCard>
    ));
  };

  const renderSkeleton = (listsToRender: number) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((item, index) => (
            <Skeleton
              key={index}
              sx={{
                bgcolor: Colors.GREY,
                marginBottom: "24px",
                borderRadius: "10px",
              }}
              variant="rectangular"
              width="100%"
              height="150px"
            />
          ))}
      </>
    );
  };
  return (
    <PersonalCardListContainer>
      {isLoading ? renderSkeleton(4) : renderCards(cards)}
    </PersonalCardListContainer>
  );
};

export default PersonalCardList;
