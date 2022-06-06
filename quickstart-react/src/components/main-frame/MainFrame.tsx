import * as React from "react";
import { Component, useEffect } from "react";
import Header from "../header/Header";
import SideMenu from "../side-menu/views/SideMenu";
import { GeneralDiv, MainContainer } from "./MainFrameStyle";
import {createNewBoard} from '../../services/script';
import Home from "../home/home";

interface MainFrameProps {}

const MainFrame: React.FC<MainFrameProps> = () => {

  // useEffect( ()=> { createNewBoard()},[]);

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
