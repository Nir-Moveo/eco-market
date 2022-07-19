import * as React from "react";
import { ICardList } from "../../types/types";
import Home from "../home/home";
import PersonalPage from "../personal-page/PersonalPage";
import SideMenu from "../side-menu/views/SideMenu";
import { GeneralDiv, MainContainer } from "./MainFrameStyle";

interface MainFrameProps {}

const MainFrame: React.FC<MainFrameProps> = () => {
  const [cards, setCards] = React.useState<ICardList>([]);
  const [isPersonalPage, setIsPersonalPage] = React.useState(false);
  return (
    <GeneralDiv>
      <MainContainer>
        <SideMenu cards={cards} setCards={setCards} setIsPersonalPage={setIsPersonalPage} />
        {isPersonalPage ? <PersonalPage></PersonalPage> : <Home cards={cards} setCards={setCards} />}
      </MainContainer>
    </GeneralDiv>
  );
};

export default MainFrame;
