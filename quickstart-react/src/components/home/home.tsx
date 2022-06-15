import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllItems } from "../../services/monday.api";
import { ICardList } from "../../types/types";
import CardList from "../cards/CardList";
import Modal from "../modal/Modal";
import { HomeBody, ContentDiv, TopLine, MainTitle, SubTitle } from "./homeStyle";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [cards, setCards] = useState<ICardList>([]);

  useEffect(() => {
    getCards();
  }, []);

  async function getCards() {
    const tmpCards = await getAllItems();
    console.log("tmpCards: ", tmpCards);

    setCards(tmpCards);
  }
  return (
    <HomeBody>
      <TopLine>
        <div className="headlines">
          <MainTitle>Today's best items</MainTitle>
          <SubTitle>You can save 24 trees by trading 1 t-shirt today!</SubTitle>
        </div>
        <Modal />
      </TopLine>
      <ContentDiv>
        <CardList cards={cards}></CardList>
      </ContentDiv>
    </HomeBody>
  );
};

export default Home;
