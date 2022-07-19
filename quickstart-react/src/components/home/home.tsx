import * as React from "react";
import { useEffect } from "react";
import { getItemsByGroup } from "../../services/monday.api";
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
  }, []);

  async function getCards() {
    const tmpCards = await getItemsByGroup(Groups.Active);
    setCards(tmpCards);
  }

  const factsArray = [
    "Sea levels will rise by 17-58cm by the end of this century due to global warming",
    "Since 1880, the average temperature has risen by 0.8 degrees Celsius ",
    "The last two decades of the 20th century have been hottest in the past 400 years, according to climate studies",
    "The Arctic is one of the worst places to be affected by global warming",
    "The Arctic ice is melting rapidly. By 2040 the region is expected to have a completely ice-free summer or even earlier",
    "Due to global warming and pollution, coral reefs are suffering the worst bleaching with the highest dying record since 1980",
    "More than 1 million species have become extinct due to disappearing habitats, ecosystems, acidic oceans, all caused due to global warming",
    "2000-2009 has been the hottest decade periods of the earth",
    "Since the industrial revolution in 1700, the level of carbon dioxide on earth has increased by 34%",
    "Droughts, hurricanes, wildfires, extinction of endangered species, melting of polar ice caps, storms are few of the effects of global warming",
  ];

  const randomNumber = Math.floor(Math.random() * 10);

  return (
    <HomeBody>
      <TopLine>
        <div className="headlines">
          <MainTitle>Today's best items</MainTitle>
          <SubTitle>{factsArray[randomNumber]}</SubTitle>
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
