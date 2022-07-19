import * as React from "react";
import { useEffect } from "react";
import { getItemsByGroup} from "../../services/monday.api";
import { Groups, ICardList } from "../../types/types";
import CardList from "../cards/CardList";
import Modal from "../modal/Modal";
import { HomeBody, ContentDiv, TopLine, MainTitle, SubTitle } from "./homeStyle";

interface HomeProps {
  cards: ICardList;
  setCards(cards: ICardList): void;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const { cards, setCards } = props;
  useEffect(() => {
    getCards();
  }, [getCards]);

  async function getCards() {
    const tmpCards = await getItemsByGroup(Groups.Active);
    setCards(tmpCards);
  }

  return (
    <HomeBody>
      <TopLine>
        <div className="headlines">
          <MainTitle>Today's best items</MainTitle>
          <SubTitle>You can save 24 trees by trading 1 t-shirt today!</SubTitle>
        </div>
        <Modal updateCards={getCards} />
      </TopLine>
      <ContentDiv>
        <CardList cards={cards}></CardList>
      </ContentDiv>
    </HomeBody>
  );
};

export default Home;
