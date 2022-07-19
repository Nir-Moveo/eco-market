import React, { useEffect, useState } from "react";
import { Groups, ICardList } from "../../types/types";
import _ from "lodash";
import { getMyItems } from "../../services/monday.api";
import PersonalCardList from "../cards/PersonalCardList";
import { Tab, TabsContainer } from "./PersonalPageStyle";

interface PersonalPageProps {
  cards: ICardList;
  setCards(cards: ICardList): void;
}
const PersonalPage: React.FC<PersonalPageProps> = (props: PersonalPageProps) => {
  const { cards, setCards } = props;
  const [tab, setTab] = useState(Groups.Active);

  async function getItems(group: Groups) {
    const myCards = await getMyItems(group);
    setCards(myCards);
  }
  useEffect(() => {
    getItems(tab);
  }, [tab]);

  
  return (
    <div>
      <h1>Your items</h1>
      <TabsContainer>
        <Tab onClick={() => setTab(Groups.Active)} className={tab === Groups.Active ? "active" : ""}>
          Active items
        </Tab>
        <Tab onClick={() => setTab(Groups.Sold)} className={tab === Groups.Sold ? "active" : ""}>
          Non-active items
        </Tab>
      </TabsContainer>
      <PersonalCardList type={tab} cards={cards}></PersonalCardList>;
    </div>
  );
};

export default PersonalPage;
