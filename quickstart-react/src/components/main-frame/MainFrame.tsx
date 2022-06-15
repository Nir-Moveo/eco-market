import * as React from "react";
import Header from "../header/Header";
import Home from "../home/home";
import SideMenu from "../side-menu/views/SideMenu";
import { GeneralDiv, MainContainer } from "./MainFrameStyle";

interface MainFrameProps {}

const MainFrame: React.FC<MainFrameProps> = () => {
  return (
    <GeneralDiv>
      <Header />
      <MainContainer>
        <SideMenu />
        <Home />
      </MainContainer>
    </GeneralDiv>
  );
};

export default MainFrame;
