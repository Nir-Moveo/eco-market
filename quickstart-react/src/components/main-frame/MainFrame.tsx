import * as React from "react";
import { Component } from "react";
import Header from "../header/Header";
import SideMenu from "../side-menu/views/SideMenu";
import { MainContainer } from "./MainFrameStyle";

interface MainFrameProps {}

const MainFrame: React.FC<MainFrameProps> = () => {
  return (
    <MainContainer>
      <Header />
      <SideMenu />
    </MainContainer>
  );
};

export default MainFrame;
