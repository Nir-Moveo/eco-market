import * as React from "react";
import { ICardList } from "../../types/types";
import Header from "../header/Header";
import Home from "../home/home";
import SideMenu from "../side-menu/views/SideMenu";
import { GeneralDiv, MainContainer } from "./MainFrameStyle";

interface MainFrameProps {}

const MainFrame: React.FC<MainFrameProps> = () => {
  const [cards, setCards] = React.useState<ICardList>([]);

  return (
    <GeneralDiv>
      <Header />
      <MainContainer>
        <SideMenu cards={cards} setCards={setCards}/>
        <Home cards={cards} setCards={setCards} />
      </MainContainer>
    </GeneralDiv>
  );
};

export default MainFrame;
