import React, { useEffect, useState } from "react";
import { Groups, ICardList } from "../../types/types";
import _ from "lodash";
import { getMyItems } from "../../services/monday.api";
import PersonalCardList from "../cards/PersonalCardList";
import { PersonalPageContainer, Tab, TabsContainer } from "./PersonalPageStyle";
import Placeholder from "../placeholder/Placeholder";

const PersonalPage = () => {
  const [tab, setTab] = useState(Groups.Active);
  const [myCards, setMyCards] = useState<ICardList>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getItems(group: Groups) {
    setIsLoading(true);

    const myCards = await getMyItems(group);
    setMyCards(myCards);
    setIsLoading(false);
  }

  useEffect(() => {
    setMyCards([]);
    getItems(tab);
  }, [tab]);

  return (
    <PersonalPageContainer>
      <h1>Your items</h1>
      <TabsContainer>
        <Tab onClick={() => setTab(Groups.Active)} className={tab === Groups.Active ? "active" : ""}>
          Active items
        </Tab>
        <Tab onClick={() => setTab(Groups.Sold)} className={tab === Groups.Sold ? "active" : ""}>
          Non-active items
        </Tab>
      </TabsContainer>
      {isLoading || myCards.length ? (
        <PersonalCardList type={tab} cards={myCards} isLoading={isLoading} />
      ) : (
        <Placeholder title="No items to display..." subTitle=""></Placeholder>
      )}
    </PersonalPageContainer>
  );
};

export default PersonalPage;
