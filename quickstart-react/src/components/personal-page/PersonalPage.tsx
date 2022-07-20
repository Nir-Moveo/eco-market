import React, { useEffect, useState } from "react";
import { Groups, ICardList } from "../../types/types";
import _ from "lodash";
import { getMyItems } from "../../services/monday.api";
import PersonalCardList from "../cards/PersonalCardList";
import { PersonalPageContainer, Tab, TabsContainer } from "./PersonalPageStyle";

const PersonalPage = () => {
  const [tab, setTab] = useState(Groups.Active);
  const [myCards, setMyCards] = useState<ICardList>([]);

  async function getItems(group: Groups) {
    const myCards = await getMyItems(group);
    setMyCards(myCards);
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
      <PersonalCardList type={tab} cards={myCards}></PersonalCardList>
    </PersonalPageContainer>
  );
};

export default PersonalPage;
